#include <TELEOP.h>
#include <PRIZM.h>
#define DEBUG 1

PRIZM prizm;
PS4 ps4;
EXPANSION expansion;

//Center of the joystick
const int CENTER = 128;
//Speed of motors
float LeftSpeed = 0, RightSpeed = 0, m_speed = 0;
//Coefficients of speed
const float default_k = 0.4, default_rotate_k = 0.7, default_m_k = 0.4;
const float nitro_k = 0.8, nitro_m_k = 0.6, slow_k = 0.2, slow_m_k = 0.2;
float k = default_k, rotate_k = default_rotate_k, m_k = default_m_k;
//Buttons
const auto GrabButton = L1, ReleaseButton = R1; 
const auto NitroMoveButton = R2, NitroManipulatorButton = L2;

void setup() {
  prizm.PrizmBegin();
  prizm.setServoSpeed(1,100);
  prizm.setMotorInvert(2, 1);
  prizm.setServoPosition(1, 0);
  #ifdef DEBUG
    Serial.begin(9600); 
  #endif 
}

void loop() {
  ps4.getPS4();
  HandleActions();
  UpdateRobot();
  #ifdef DEBUG
    Serial.println(expansion.readEncoderDegrees(1, 1));
  #endif
}

//Function to handle ps4 controller actions
void HandleActions(){
  HandleMoveActions();
  HandleManipulatorMoveActions();
  HandleManipulatorGrabActions();
  HandleNitroActions();
  HandleManipulatorPositionActions();
  HandleMicroMovement();
}

void UpdateRobot(){
  prizm.setMotorPowers((int)LeftSpeed, (int)RightSpeed);
  expansion.setMotorPower(1, 1, (int)m_speed);
}

void HandleMoveActions(){
  LeftSpeed = k * (float)(ps4.Stick(RY) - 128) / 1.28 - (rotate_k * k * (float)(ps4.Stick(RX) - 128) / 1.28);
  RightSpeed = k * (float)(ps4.Stick(RY) - 128) / 1.28 + (rotate_k * k * (float)(ps4.Stick(RX) - 128) / 1.28);
}
void HandleManipulatorMoveActions(){
  int currentPos = expansion.readEncoderDegrees(1, 1);
  if(ps4.Button(UP)){
    m_speed = -100 * m_k;
    if(currentPos <= -400){ m_speed = 0; }
  }
  else if(ps4.Button(DOWN)){
    m_speed = 50 * m_k;
    if(currentPos >= 125){ m_speed = 0; }
    else if(currentPos >= 0){ m_speed = 20 * m_k; }
  }
  else{
    m_speed = 0;
  }
}
void HandleManipulatorGrabActions(){
  if(ps4.Button(GrabButton)){
    prizm.setServoPosition(1, 80);
  }
  else if(ps4.Button(ReleaseButton)){
    prizm.setServoPosition(1, 0);
  }
}
void HandleNitroActions(){
  k = (ps4.Button(NitroMoveButton))? nitro_k : default_k;
  m_k = (ps4.Button(NitroManipulatorButton)) ? nitro_m_k : default_m_k;
}
void HandleManipulatorPositionActions(){
  if(ps4.Button(RIGHT)){
    expansion.setMotorDegree(1, 1, 100, 120);
  }
  if(ps4.Button(SHARE)){
    expansion.setMotorDegree(1, 1, 720, 0);
  }
}

void HandleMicroMovement(){
  if(ps4.Button(OPTIONS)){
    prizm.setMotorPowers(10, 10);
    delay(10);
    prizm.setMotorPowers(20, 20);
    delay(10);
    prizm.setMotorPowers(10, 10);
    delay(10);
  }
}

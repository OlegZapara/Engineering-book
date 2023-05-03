const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if(entry.isIntersecting){
      entry.target.parentElement.classList.add('show')
    }
    else{
      entry.target.parentElement.classList.remove('show')
    }
  })
})


const hiddenElements = document.querySelectorAll('.trigger')
hiddenElements.forEach((el) => observer.observe(el))

const buttons = document.getElementsByClassName('text__additional')
for(let button of buttons){
  button.addEventListener('click', toggleInfo)
}

const closeButtons = document.getElementsByClassName('close_record-info')
for(let button of closeButtons){
  button.addEventListener('click', close)
}

function toggleInfo(e){
  e.target.parentElement.parentElement.scrollIntoView({block: "center", behaviour:"smooth"})
  e.target.parentElement.parentElement.parentElement.classList.add('enableBlur')
  e.target.parentElement.parentElement.querySelector('.record-info').classList.add('show-info')
  e.target.parentElement.parentElement.querySelector('.record-info').classList.add('disableBlur')

  document.querySelector('body').style.height = '100%'
  document.querySelector('body').style.overflowY = 'hidden'

}

function close(e){
  e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('enableBlur')
  e.target.parentElement.parentElement.classList.remove('show-info')

  document.querySelector('body').style.height = 'auto'
  document.querySelector('body').style.overflowY = 'scroll'
}
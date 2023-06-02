const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.parentElement.classList.add('show')
    }
    else{
      entry.target.parentElement.classList.remove('show')
    }
  })
})

const authorObserver = new IntersectionObserver((authors) => {
  authors.forEach((author) => {
    if(author.isIntersecting){
      author.target.parentElement.classList.add('author-show')
    }
    else{
      author.target.parentElement.classList.remove('author-show')
    }
    
  })
})
function max(a, b){
  if(a > b){
    return a;
  }
  else{
    return b;
  }
}
window.addEventListener('scroll', function(){
  if(this.window.innerWidth < 1300) return;
  var scrollTop = this.scrollY / 1000;
  var el = document.getElementById('authors-overlay');
  el.style.opacity = `${max(scrollTop - this.window.innerHeight / 800, 0)}`;
})

const hiddenElements = document.querySelectorAll('.trigger')
hiddenElements.forEach((el) => observer.observe(el))

const authors = document.querySelectorAll('.author-trigger')
authors.forEach((el) => authorObserver.observe(el))

const buttons = document.getElementsByClassName('text__additional')
for(let button of buttons){
  button.addEventListener('click', toggleInfo)
}

const closeButtons = document.getElementsByClassName('close_record-info')
for(let button of closeButtons){
  button.addEventListener('click', close)
}

function toggleInfo(e){

  let wrapper = document.getElementById('info-wrapper')
  wrapper.style.display = 'flex'

  let background = document.querySelector('.wrapper')
  background.classList.add('enableBlur')

  let record_info = e.target.parentElement.parentElement.querySelector('.record-info')
  let copy = record_info.cloneNode(true)
  copy.classList.add('show-info')
  copy.querySelector('.close_record-info').addEventListener('click', close)
  wrapper.appendChild(copy)

  document.querySelector('body').style.height = '100vh'
  document.querySelector('body').style.overflowY = 'hidden'

}

function close(e){
  let wrapper  = document.getElementById("info-wrapper")
  wrapper.replaceChildren()
  wrapper.style.display = "none"

  let background = document.querySelector('.wrapper')
  background.classList.remove('enableBlur')

  document.querySelector('body').style.height = 'auto'
  document.querySelector('body').style.overflowY = 'scroll'
}

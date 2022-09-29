function Message() {
  this.msg = ''
  this.color = '#edf2fc'
  HTMLElement.prototype.css = function (key, value) {
    this.style[key] = value
    return this
  }
}
Message.prototype.info = function () {
  let box = document.createElement('div')
  box.innerHTML = this.msg
  box
    .css('position', 'absolute')
    .css('left', '50%')
    .css('top', '30px')
    .css('transform', 'translateX(-50%)')
    .css('box-shadow', '5px')
    .css('background-color', this.color)
    .css('min-width', '300px')
    .css('text-align', 'center')
    .css('padding', '10px')
    .css('border-radius', '3px')
    .css('opacity', 1)
    .css('z-index', 99999)
  document.body.appendChild(box)
  for (let i = 30; i <= 50; i++) {
    setTimeout(() => {
      box.style.opacity -= 0.05
      if (box.style.opacity == 0 && box) document.body.removeChild(box)
    }, i * 50)
  }
}
Message.prototype.success = function (msg = '默认消息') {
  this.msg = msg
  this.color = '#f0f9eb'
  this.info()
}
Message.prototype.error = function (msg = '默认消息') {
  this.msg = msg
  this.color = '#fef0f0'
  this.info()
}

Message.prototype.confirm = function (title = '默认标题', msg = '默认提示', fn) {
  let box = document.createElement('div')
  box.innerHTML = `
    <div class="title">${title}</div>
    <div class="content">${msg}</div>
    <div class="button">
    <button type="button" class="cancel">取消</button>
      <button type="button" class="confirm">确认</button>
    </div>
    `
  let titleEle = box.querySelector('.title')
  let contentEle = box.querySelector('.content')
  let buttonEle = box.querySelectorAll('button')
  let confirm = box.querySelector('.confirm')
  let cancel = box.querySelector('.cancel')
  box
    .css('min-width', '350px')
    .css('position', 'absolute')
    .css('left', '50%')
    .css('top', '50%')
    .css('transform', 'translate(-50%, -50%)')
    .css('background-color', '#edf2fc')
    .css('box-shadow', '10px')
    .css('font-size', '16px')
    .css('z-index', 99999)
  titleEle.css('background-color', '#bacdf3').css('padding', '10px')
  contentEle.css('padding', '20px')
  buttonEle.forEach(item => {
    item
      .css('border', 0)
      .css('outline', 'none')
      .css('padding', '8px')
      .css('width', '70px')
      .css('border-radius', '5px')
      .css('float', 'right')
      .css('margin-right', '10px')
      .css('margin-bottom', '10px')
      .css('cursor', 'pointer')
  })
  cancel.css('background-color', '#ddd')
  confirm.css('background-color', '#bacdf3')
  document.body.appendChild(box)
  // 事件
  confirm.addEventListener('click', function () {
    typeof fn === 'function' && fn(true)
    document.body.removeChild(box)
  })
  cancel.addEventListener('click', function () {
    typeof fn === 'function' && fn(false)
    document.body.removeChild(box)
  })
}
window.message = new Message()
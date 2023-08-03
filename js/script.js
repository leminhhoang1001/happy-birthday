const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')

card.addEventListener('click', e => {
  card.classList.toggle('flipped')
  if (tapHint) {
    tapHint.remove()
  }
})
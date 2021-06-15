class GenerateUrlUseCase {
  create () {
    const chatacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghhijklmnopqrstuvwxyz0123456789'
    const charArr = [...chatacters]

    let code = ''
    
    for(let i=0; i<5; i++) {
      let randomNumber = Math.floor(Math.random() * charArr.length)
      code += charArr[randomNumber]
    }

    return code
  }
}

module.exports = new GenerateUrlUseCase()
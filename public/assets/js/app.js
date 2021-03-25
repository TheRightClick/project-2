

const getImage = (uploadFile) => {
    if (document.contains(document.getElementById("uploadImg"))) {
        document.getElementById("uploadImg").remove();
        let fileName = uploadFile.value.replace(/^.*\\/, "")
        let newImage = document.createElement("IMG")
        document.getElementById("imgDiv").appendChild(newImage)
        document.querySelector('img').classList.add('mediaImg')
        document.querySelector('img').setAttribute('id', 'uploadImg')
        newImage.src = `/${fileName}`
}   else {
    let fileName = uploadFile.value.replace(/^.*\\/, "")
    let newImage = document.createElement("IMG")
    document.getElementById("imgDiv").appendChild(newImage)
    document.querySelector('img').classList.add('mediaImg')
    document.querySelector('img').setAttribute('id', 'uploadImg')
    newImage.src = `/${fileName}`
    }
}

const ckCat = (catArray) => {
    let optionArr = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3')]
    for(let i = 0; i < catArray.length; i++){
        for(let j = 0; j < optionArr.length; j++) {
        if(catArray[i] === optionArr[j].text){
          optionArr[j].selected = true
        } 
    }}}

const ckPass = () => {
    let pass = document.getElementById('pass').value
    let conPass = document.getElementById('conPass').value
    let btn = document.getElementById('btnSubmit')
    let error = document.getElementById('errorText')
    if(pass === conPass) {
        btn.style.backgroundColor =  "rgba(169, 189, 255)";
        btn.disabled = false
        error.hidden = true
    } else {
        btn.disabled = true
        btn.style.backgroundColor = "whitesmoke"
        error.hidden = false
    }
}


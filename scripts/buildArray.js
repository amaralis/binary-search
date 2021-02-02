import { target, numSteps, arrLen } from './listeners.js';
import utils from './utils.js';

        
// let numSteps = 0;

createArrayDiv();

const buildArray = function(len, start) {

    const arrays = Array.from(document.getElementsByClassName('array'));

    arrays.forEach(arr => {
        const step = getNumAfterDash(arr.id);
        const arrContainer = document.querySelector(`#array-${numSteps}`);
        arrContainer.innerHTML = '';
        const newArrEnd = start + len;

        for(let i = start; i < newArrEnd; i++){
            arrContainer.appendChild(createCell(i));
        }

        
        let count = 0;
        for(const val of arr.children){
            count++;
            const valArr = Array.from(val.classList);
            if(valArr.includes(`value-${target}`)){
                utils.colorizeTarget(val.children[1], 'rgb(0,255,0)');
            }
        }
        arr.dataset.length = `${len}`;
    });

    createArrowDivs();
}

// export function colorizeTarget(htmlElt, color) {
//     htmlElt.style = `background-color: ${color};`;
// }

export const getNumAfterDash = function(arrIdStr) {
    let hasSeparator = false;
    let separatorIndex = 0;
    let arrIdStrNums = [];
    for(let i = 0; i <arrIdStr.length; i++){
        if(arrIdStr[i] === '-'){
            separatorIndex = i;
            hasSeparator = true;
        }

        if(hasSeparator && arrIdStr[i] !== '-'){
            arrIdStrNums.push(arrIdStr[i]);
        }
    }
    const num = parseInt(arrIdStrNums.join(''));

    return num;
}

export function createArrayDiv() {
    const container = document.querySelector('.demo-container');
    const innerContainer = document.createElement('div');

    innerContainer.id = `array-${numSteps}-container`;
    innerContainer.classList.add('array-inner-container');

    const arr = document.createElement('div');
    arr.classList.add('array');
    arr.id = `array-${numSteps}`;

    innerContainer.appendChild(arr);

    const stepGuideDivEn = document.createElement('div');
    stepGuideDivEn.classList.add('text-EN');
    stepGuideDivEn.classList.add('step-guide-div-en');
    stepGuideDivEn.classList.add('step-guide-div');
    stepGuideDivEn.id = `step-guide-div-en-${numSteps}`;
    stepGuideDivEn.style.height = 0;

    const stepGuideParaEn = document.createElement('p');
    stepGuideParaEn.classList.add('text-EN');
    stepGuideParaEn.classList.add('step-guide-para-en');
    stepGuideParaEn.classList.add('step-guide-para');
    stepGuideParaEn.id = `step-guide-para-en-${numSteps}`;
    stepGuideParaEn.style.height = 0;
    
    const stepGuideDivPt = document.createElement('div');
    stepGuideDivPt.classList.add('text-PT');
    stepGuideDivPt.classList.add('step-guide-div-pt');
    stepGuideDivPt.classList.add('step-guide-div');
    stepGuideDivPt.id = `step-guide-div-pt-${numSteps}`;
    stepGuideDivPt.style.height = 0;
    stepGuideDivPt.hidden = true;

    const stepGuideParaPt = document.createElement('p');
    stepGuideParaPt.classList.add('text-PT');
    stepGuideParaPt.classList.add('step-guide-para-pt');
    stepGuideParaPt.classList.add('step-guide-para');
    stepGuideParaPt.id = `step-guide-para-pt-${numSteps}`;
    stepGuideParaPt.style.height = 0;
    stepGuideParaPt.hidden = true;

    container.appendChild(innerContainer);

    let btn = document.createElement('button');
    btn.textContent = 'Next Step';
    btn.classList.add('btn');
    btn.classList.add('next-step-btn');
    btn.classList.add('text-EN');
    btn.id = `btn-en-${numSteps}-next`;
    innerContainer.appendChild(btn);
    
    innerContainer.appendChild(stepGuideDivEn);
    innerContainer.appendChild(stepGuideDivPt);
    stepGuideDivEn.appendChild(stepGuideParaEn);
    stepGuideDivPt.appendChild(stepGuideParaPt);
    
    innerContainer.insertBefore(btn, stepGuideDivEn);
    innerContainer.insertBefore(btn, stepGuideDivPt);

    btn = document.createElement('button');
    btn.textContent = 'Próximo Passo';
    btn.classList.add('btn');    
    btn.classList.add('next-step-btn');    
    btn.classList.add('text-PT');
    btn.id = `btn-pt-${numSteps}-next`;
    btn.hidden = true;
    innerContainer.appendChild(btn);

}

const createArrowDivs = function(){
    const greenArrowDiv = document.createElement('div');
    greenArrowDiv.classList.add('up-arrow-div');
    greenArrowDiv.id = `up-arrow-div-green-${numSteps}`;
    const redArrowDiv = document.createElement('div');
    redArrowDiv.classList.add('up-arrow-div');
    redArrowDiv.id = `up-arrow-div-red-${numSteps}`;

    const greenArrow = document.createElement('img');
    const redArrow = document.createElement('img');
    
    const arr = document.querySelector(`#array-${numSteps}`);
    const cellStyles = getComputedStyle(Array.from(document.getElementsByClassName('index'))[0]);
    const cellWidth = parseStyleStr(cellStyles.width);
    
    greenArrow.classList.add('up-arrow');
    greenArrow.id = 'up-arrow-green-' + numSteps.toString();
    greenArrow.src = './images/upArrowGreen.png';
    greenArrow.alt = 'minimum arrow';
    greenArrow.style.width = cellStyles.width;
    greenArrow.style.left = `0px`;
    
    redArrow.classList.add('up-arrow');
    redArrow.id = 'up-arrow-red-' + numSteps.toString();
    redArrow.src = './images/upArrowRed.png';
    redArrow.alt = 'maximum arrow';
    redArrow.style.width = cellStyles.width;
    redArrow.style.right = `0px`;

    greenArrowDiv.appendChild(greenArrow);
    redArrowDiv.appendChild(redArrow);
    
    arr.children[0].appendChild(greenArrowDiv);
    arr.children[arr.children.length-1].appendChild(redArrowDiv);
}

const createCell = function(index){
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.classList.add(`index-${index}`);
    cellDiv.classList.add(`value-${index + 1}`);

    const indexPara = cellDiv.appendChild(document.createElement('p'));
    indexPara.classList.add('index');

    const indexContent = document.createTextNode((index).toString());
    indexPara.appendChild(indexContent);

    const valuePara = cellDiv.appendChild(document.createElement('p'));
    valuePara.classList.add('value');
    // valuePara.classList.add(`index-${index}`);

    const value = document.createTextNode((index + 1).toString());
    valuePara.appendChild(value);

    return cellDiv;
}

export const parseStyleStr = function(str){
    let newStr = [];

    for(let i = 0; i < str.length-2; i++){
        newStr.push(str[i]);
    }

    const num = parseInt(newStr.join(''));

    return num;

}

export default buildArray;

buildArray(arrLen, 0);

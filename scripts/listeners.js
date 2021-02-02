import buildArray, { colorizeTarget, createArrayDiv, getNumAfterDash } from './buildArray.js';
import { showMidPointText, outOfBoundsTarget, shiftMinArrow, shiftMaxArrow } from './steps.js';

const toggleEnPtBtn = document.getElementById('toggleEN-PT');
const togglePtEnBtn = document.getElementById('togglePT-EN');
const arrLenInput = document.querySelector('#array-size');
const targetDiv = document.querySelector('#search-target');
const masterContainer = document.querySelector('#demo-container');
const resetBtns = document.getElementsByClassName('reset-btn');

export let arrLen = 30;
let arrStart = 0;
export let target = 1;
let curMidVal = 0;
export let numSteps = 0;
let tempSteps = 0;
let newLen = 0;
let midIndex = Math.round(arrLen/2 - 1);
// console.log('Calculating midIndex:', arrLen, '/',2, '=', Math.floor(arrLen/2))
let newMidIndex = 0;
let foundTarget = false;

export const listeners = {
    init: function(){
        toggleEnPtBtn.addEventListener('click', () => {
            const enElts = Array.from(document.getElementsByClassName('text-EN'));
            const ptElts = Array.from(document.getElementsByClassName('text-PT'));
            
            enElts.forEach(element => {
                element.hidden = true;
                element.style.height = 0;
            });

            ptElts.forEach(element => {
                element.hidden = false;
                element.style.height = 'auto';
            });

            toggleEnPtBtn.hidden = 'true';
            togglePtEnBtn.hidden = false;

            // If english elements are hidden, en-pt button is active

            toggleEnPtBtn.dataset.active = true;
            togglePtEnBtn.dataset.active = false;
        });

        togglePtEnBtn.addEventListener('click', () => {
            const enElts = Array.from(document.getElementsByClassName('text-EN'));
            const ptElts = Array.from(document.getElementsByClassName('text-PT'));
            
            enElts.forEach(element => {
                element.hidden = false;
                element.style.height = 'auto';
            });

            ptElts.forEach(element => {
                element.hidden = true;
                element.style.height = 0;
            });

            togglePtEnBtn.hidden = true;
            toggleEnPtBtn.hidden = false;

            // If portuguese elements are hidden, pt-en button is active

            togglePtEnBtn.dataset.active = true;
            toggleEnPtBtn.dataset.active = false;
        });

        arrLenInput.addEventListener('change', () => {
            if(parseInt(arrLenInput.value) <= parseInt(arrLenInput.max) && parseInt(arrLenInput.value) >= parseInt(arrLenInput.min)){
                arrLen = parseInt(arrLenInput.value);
                midIndex = Math.floor(arrLen/2);

                buildArray(arrLen, arrStart);
            }
        });

        targetDiv.addEventListener('change', (e) => {
            target = parseInt(e.target.value);
            const arrContainer = document.querySelector('#demo-container');

            for(const val of arrContainer.children){
                if(val.classList.contains('array-inner-container')){
                    for(const val2 of val.children[0].children){
                        if(val2.children[1] && val2.classList.contains(`value-${target}`)){
                            colorizeTarget(val2.children[1], 'rgb(0,255,0)');                            
                        } else if(val2.children[1] && !val2.classList.contains(`value-${target}`)){
                            val2.children[1].style = 'background-color: rgba(0,0,0,0);';
                            
                        }
                    }
                }
            }
        });

        masterContainer.addEventListener('click', e => {
            e.stopPropagation();
            midIndex = Math.round(arrLen/2 - 1);
            if(e.target.classList.contains('next-step-btn')){
                let htmlArray;

                for(const val of e.target.parentNode.children){
                    if(val.classList.contains('array')){
                        newLen = parseInt(val.dataset.length);
                        htmlArray = val;


                        let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                        let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);
                        newMidIndex = Math.round(newArrayEndIndex - arrLen/4);
                        
                        arrLen = newArrayEndIndex - newArrayStartIndex;
                        curMidVal = newArrayStartIndex + midIndex + 1;
                        midIndex = Math.round(newArrayStartIndex + arrLen/2 - 1);

                        for(const val2 of val.children){
                            if(val2.classList.contains(`index-${midIndex}`)){
                                colorizeTarget(val2.children[1], 'rgb(255,255,0)');
                            }
                        }
                    }
                }

                for(const val of e.target.parentNode.children){
                    if(val.classList.contains('array')){
                        const num = getNumAfterDash(val.id);
                        if(tempSteps === 0){
                            // console.log('tempSteps ===================', tempSteps)

                            // arrLenInput
                            document.querySelector('#search-target-input').readOnly = true;
                            arrLenInput.readOnly = true;

                            let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                            let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);
                            
                            arrLen = newArrayEndIndex - newArrayStartIndex;
                            midIndex = Math.round(newArrayStartIndex + arrLen/2 - 1);                
                            curMidVal = midIndex + 1;

                            newMidIndex = Math.round(newArrayEndIndex - arrLen/4);

                            const enDiv = e.target.parentNode.children[`step-guide-div-en-${num}`];
                            const ptDiv = e.target.parentNode.children[`step-guide-div-pt-${num}`];

                            // console.log(curMidVal)
                            if(curMidVal === target){
                                foundTarget = true;
                            }
                            
                            if(arrLen === 1 && !foundTarget){
                                outOfBoundsTarget(enDiv, target, curMidVal, numSteps);
                                outOfBoundsTarget(ptDiv, target, curMidVal, numSteps);

                                createResetBtn();
                                document.querySelector('#search-target-input').readOnly = false;
                                arrLenInput.readOnly = false;

                            } else {
                                showMidPointText(enDiv, target, curMidVal, numSteps);
                                showMidPointText(ptDiv, target, curMidVal, numSteps);                                
                            }

                            if(toggleEnPtBtn.dataset.active === 'true'){
                                togglePtEnBtn.click();
                                toggleEnPtBtn.click();
                            }

                            tempSteps++;
                        } else if(tempSteps === 1){
                            // console.log('tempSteps ===================', tempSteps)

                            let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                            let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);
                            
                            arrLen = newArrayEndIndex - newArrayStartIndex;
                            midIndex = Math.round(arrLen/2 - 1);                
                            curMidVal = newArrayStartIndex + midIndex + 1;

                            if(target === curMidVal){
                                if(arrLen === 1 && !foundTarget){
                                    resetArray(e);
                                }
                                foundTarget = true;
                                createResetBtn();

                                document.querySelector('#search-target-input').readOnly = false;
                                arrLenInput.readOnly = false;
                                
                            } else if(target > curMidVal){
                                const minArrow = htmlArray.children[0].children[2].children[0];
                                shiftMinArrow(minArrow, htmlArray, (curMidVal + 1));
                                
                            } else if(target < curMidVal){
                                const maxArrow = htmlArray.children[htmlArray.children.length-1].children[2].children[0];                                
                                shiftMaxArrow(maxArrow, htmlArray, (curMidVal - 1));
                            }
                            if(toggleEnPtBtn.dataset.active === 'true'){
                                togglePtEnBtn.click();
                                toggleEnPtBtn.click();
                            }
                            tempSteps++;
                        } else if(tempSteps === 2){
                            // console.log('tempSteps ===================', tempSteps)
                            // Highlight new middle point

                            let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                            let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);
                            newMidIndex = Math.round(newArrayEndIndex - arrLen/4);
                            
                            arrLen = newArrayEndIndex - newArrayStartIndex;
                            midIndex = Math.round(arrLen/2 - 1);                
                            curMidVal = newArrayStartIndex + midIndex + 1;

                            if(target === curMidVal){

                                // Target found logic

                            } else if(target > curMidVal){
                                let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                                let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);

                                newMidIndex = Math.round((curMidVal - 1) + arrLen/4);

                                for(const val of htmlArray.children){
                                    if(val.classList.contains(`index-${Math.round(newMidIndex)}`)){
                                        colorizeTarget(val.children[1], 'rgb(0,255,255)');
                                    }
                                }
                            } else if(target < curMidVal){
                                let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1])
                                let newArrayEndIndex = newArrayStartIndex + (htmlArray.children.length);
                                newMidIndex = Math.floor(curMidVal - arrLen/4);

                                for(const val of htmlArray.children){
                                    if(val.classList.contains(`index-${Math.round(newMidIndex-1)}`)){
                                        colorizeTarget(val.children[1], 'rgb(0,255,255)');
                                    }
                                }
                            }
                            if(toggleEnPtBtn.dataset.active === 'true'){
                                togglePtEnBtn.click();
                                toggleEnPtBtn.click();
                            }
                            tempSteps++;
                        } else if(tempSteps > 2){
                            // console.log('tempSteps ===================', tempSteps);

                            if(target === curMidVal){

                                // Target found logic

                            } else if(target > curMidVal){
                                // curMidVal is already +1 over index
                                let newArrayStartIndex = curMidVal;
                                let newArrayEndIndex = getNumAfterDash(htmlArray.children[htmlArray.children.length - 1].classList[1]);

                                arrLen = newArrayEndIndex - newArrayStartIndex + 1;
                                midIndex = Math.round(newArrayStartIndex + arrLen/2 - 1);

                                numSteps++;
                                tempSteps = 0;

                                createArrayDiv();
                                buildArray(arrLen, newArrayStartIndex);
                                e.target.style.display = 'none';
                                
                            } else if(target < curMidVal){                                
                                let newArrayStartIndex = getNumAfterDash(htmlArray.children[0].classList[1]);
                                let newArrayEndIndex = curMidVal - 2;

                                if(newArrayEndIndex < 0){
                                    newArrayEndIndex = 0;
                                }

                                arrLen = newArrayEndIndex - newArrayStartIndex + 1;
                                midIndex = Math.round(newArrayStartIndex + arrLen/2 - 1);

                                numSteps++;
                                tempSteps = 0;

                                createArrayDiv();
                                buildArray(arrLen, newArrayStartIndex);
                                e.target.style.display = 'none';
                            }

                            if(toggleEnPtBtn.dataset.active === 'true'){
                                togglePtEnBtn.click();
                                toggleEnPtBtn.click();
                            }
                            tempSteps = 0;
                        }
                    }
                }
            }
            resetArray(e);
        });
    }
}

function resetArray(e){
    if(e.target.classList.contains('reset-btn')){
        e.stopPropagation();
        let containerArr = [];
        for(const container of e.target.parentNode.children){
            if(container.classList.contains('array-inner-container')){
                containerArr.push(container)
            }
        }
        containerArr.forEach(container => container.remove());
        
        let resetBtnArr = [];
        for(const btn of resetBtns){
            if(btn.classList.contains('reset-btn')){
                resetBtnArr.push(btn)
            }
        }
        resetBtnArr.forEach(btn => btn.remove());
    
        createArrayDiv();
        buildArray(arrLen, 0);

        if(toggleEnPtBtn.dataset.active === 'true'){
            togglePtEnBtn.click();
            toggleEnPtBtn.click();
        }

        foundTarget = false;
    }
}

function createResetBtn(){
    // console.log(document.getElementsByClassName('next-step-btn'));
    let tempArr = [];
    for(const val of document.getElementsByClassName('next-step-btn')){
        // Unintuitive behavior: removing val here only removes one button
        tempArr.push(val);
    }

    tempArr.forEach(btn => btn.remove());

    let btnEnPt = document.createElement('button');
    btnEnPt.classList.add('text-EN');
    btnEnPt.classList.add('btn');
    btnEnPt.classList.add('reset-btn');
    btnEnPt.id = "reset-btn-en";
    btnEnPt.textContent = 'Reset';
    
    let btnPtEn = document.createElement('button');
    btnPtEn.classList.add('text-PT');
    btnPtEn.classList.add('btn');
    btnPtEn.classList.add('reset-btn');
    btnPtEn.id = "reset-btn-pt";
    btnPtEn.textContent = 'Reiniciar';
    btnPtEn.hidden = true;

    masterContainer.appendChild(btnEnPt);
    masterContainer.appendChild(btnPtEn);

    arrLen = 30;
    numSteps = 0;
    tempSteps = -1;

    foundTarget = true;

}
import { parseStyleStr } from './buildArray.js';

export const showMidPointText = function(htmlPara, target, value, numSteps){
    if(htmlPara.classList.contains('text-EN')){
        if(target > value){
            htmlPara.innerHTML = `Our target of <strong>${target}</strong> is greater than our middle point value (<strong>${value}</strong>). We will now select a range from our midpoint of <strong>${value}</strong> (and add 1, because we already compared <strong>${value}</strong> with our target) to the end of the array. Then we select a new value at that new list's middle point. Click "Next Step" until we find our target and watch the process unfold!`;
        } else if(target < value){
            htmlPara.innerHTML = `Our target of <strong>${target}</strong> is less than our middle point value (<strong>${value}</strong>). We will now select a range from our midpoint of <strong>${value}</strong> (and subtract 1, because we already compared <strong>${value}</strong> with our target) to the start of the array. Then we select a new value at that new list's middle point. Click "Next Step" until we find our target and watch the process unfold!`;
        } else if(target === value){
            htmlPara.innerHTML = `Our target of <strong>${target}</strong> is equal to our searched value (<strong>${value}</strong>). We found what we were looking for in only <strong>${numSteps + 1}</strong> steps!`;
        }
    } else {
        if(target > value){
            htmlPara.innerHTML = `O nosso alvo (<strong>${target}</strong>) é maior que o valor a meio da lista (<strong>${value}</strong>). Agora seleccionamos novos valores, desde o nosso valor de <strong>${value}</strong> (e adicionamos 1, porque já comparámos <strong>${value}</strong> com o nosso alvo) até ao fim da lista. Depois seleccionamos um novo valor a meio dessa nova lista. Clica em "Próximo Passo" até encontrarmos o que procuramos e vê o processo em acção.`;
        } else if(target < value){
            htmlPara.innerHTML = `O nosso alvo (<strong>${target}</strong>) é menor que o valor a meio da lista (<strong>${value}</strong>). Agora seleccionamos novos valores, desde o nosso valor de <strong>${value}</strong> (e subtraímos 1, porque já comparámos <strong>${value}</strong> com o nosso alvo) até ao início da lista. Depois seleccionamos um novo valor a meio dessa nova lista. Clica em "Próximo Passo" até encontrarmos o que procuramos e vê o processo em acção.`;
        } else if(target === value){
            htmlPara.innerHTML = `O nosso alvo (<strong>${target}</strong>) é igual ao valor que procuramos (<strong>${value}</strong>) e só precisámos de <strong>${numSteps + 1}</strong> passos para aqui chegar!`;
        }
    }

    htmlPara.style.height = 'auto';
    htmlPara.style.padding = '.6rem';
}

export const outOfBoundsTarget = function(htmlPara, target, value, numSteps){
    if(htmlPara.classList.contains('text-EN')){
        if(target > value){
            htmlPara.innerHTML = `Our target of <strong>${target}</strong> is greater than our middle point value (<strong>${value}</strong>). Because our current list has no more items, we now know, it does not contain our target. We're done in only ${numSteps}</strong> steps!`;
        } else if(target < value){
            htmlPara.innerHTML = `Our target of <strong>${target}</strong> is less than our middle point value (<strong>${value}</strong>). Because our current list has no more items, we now know, it does not contain our target. We're done in only ${numSteps} steps!`;
        }
    } else {
        if(target > value){
            htmlPara.innerHTML = `O nosso alvo (<strong>${target}</strong>) é maior que o valor a meio da lista (<strong>${value}</strong>). Como a nossa lista não tem mais valores, sabemos agora que não contém o nosso alvo. A busca terminou em apenas <strong>${numSteps}</strong> passos!`;
        } else if(target < value){
            htmlPara.innerHTML = `O nosso alvo (<strong>${target}</strong>) é menor que o valor a meio da lista (<strong>${value}</strong>). Como a nossa lista não tem mais valores, sabemos agora que não contém o nosso alvo. A busca terminou em apenas <strong>${numSteps}</strong> passos!`;
        }
    }

    htmlPara.style.height = 'auto';
    htmlPara.style.padding = '.6rem';
}

export const shiftMinArrow = function(arrowHtmlElt, htmlArray, divValue){
    // const cellStyles = getComputedStyle(Array.from(document.getElementsByClassName('index'))[0]);
    // const cellWidth = parseStyleStr(cellStyles.width);

    arrowHtmlElt.remove();
    
    // console.log(arrowHtmlElt)
    for(const val of htmlArray.children){
        if(val.classList.contains(`value-${divValue}`)){
            // newCellValue = val;
            // console.log('val', val)
            val.appendChild(arrowHtmlElt);
            // console.log(val.children)
            arrowHtmlElt.style.left = "";
            // console.log(arrowHtmlElt.style)
        }
    }
}

export const shiftMaxArrow = function(arrowHtmlElt, htmlArray, divValue){
    // const cellStyles = getComputedStyle(Array.from(document.getElementsByClassName('index'))[0]);
    // const cellWidth = parseStyleStr(cellStyles.width);

    // console.log(cellWidth)

    // arrowDiv.style.right = `${(numCellsShift)*cellWidth}px`;
    arrowHtmlElt.remove();
    // const redArrowDiv = document.createElement('div');
    // redArrowDiv.classList.add('up-arrow-div');
    // redArrowDiv.id = `up-arrow-div-red-${numSteps}`;
    // console.log(arrowHtmlElt)
    // let newCellValue;
    for(const val of htmlArray.children){
        if(val.classList.contains(`value-${divValue}`)){
            // newCellValue = val;
            // console.log('val', val)
            val.appendChild(arrowHtmlElt);
            // console.log(val.children)
            arrowHtmlElt.style.right = "";
            // console.log(arrowHtmlElt.style)
        }
    }
}
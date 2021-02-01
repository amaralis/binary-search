import { parseStyleStr } from './buildArray.js';

export const showMidPointText = function(htmlPara, target, value, numSteps){
    if(htmlPara.classList.contains('text-EN')){
        if(target > value){
            htmlPara.textContent = `Our target of ${target} is greater than our middle point value (${value}). We will now select a range from our midpoint of ${value} (and add 1, because we already compared ${value} with our target) to the end of the array. Then we select a new value at that new list's middle point. Click "Next Step" until we find our target and watch the process unfold!`;
        } else if(target < value){
            htmlPara.textContent = `Our target of ${target} is less than our middle point value (${value}). We will now select a range from our midpoint of ${value} (and subtract 1, because we already compared ${value} with our target) to the start of the array. Then we select a new value at that new list's middle point. Click "Next Step" until we find our target and watch the process unfold!`;
        } else if(target === value){
            htmlPara.textContent = `Our target of ${target} is equal to our searched value (${value}). We found what we were looking for in only ${numSteps + 1} steps!`;
        }
    } else {
        if(target > value){
            htmlPara.textContent = `O nosso alvo (${target}) é maior que o valor a meio da lista (${value}). Agora seleccionamos novos valores, desde o nosso valor de ${value} (e adicionamos 1, porque já comparámos ${value} com o nosso alvo) até ao fim da lista. Depois seleccionamos um novo valor a meio dessa nova lista. Clica em "Próximo Passo" até encontrarmos o que procuramos e vê o processo em acção.`;
        } else if(target < value){
            htmlPara.textContent = `O nosso alvo (${target}) é menor que o valor a meio da lista (${value}). Agora seleccionamos novos valores, desde o nosso valor de ${value} (e subtraímos 1, porque já comparámos ${value} com o nosso alvo) até ao início da lista. Depois seleccionamos um novo valor a meio dessa nova lista. Clica em "Próximo Passo" até encontrarmos o que procuramos e vê o processo em acção.`;
        } else if(target === value){
            htmlPara.textContent = `O nosso alvo (${target}) é igual ao valor que procuramos (${value}) e só precisámos de ${numSteps + 1} passos para aqui chegar!`;
        }
    }

    htmlPara.style.height = 'auto';
    htmlPara.style.padding = '.6rem';
}

export const outOfBoundsTarget = function(htmlPara, target, value, numSteps){
    if(htmlPara.classList.contains('text-EN')){
        if(target > value){
            htmlPara.textContent = `Our target of ${target} is greater than our middle point value (${value}). Because our current list has no more items, we now know, it does not contain our target. We're done in only ${numSteps} steps!`;
        } else if(target < value){
            htmlPara.textContent = `Our target of ${target} is less than our middle point value (${value}). Because our current list has no more items, we now know, it does not contain our target. We're done in only ${numSteps} steps!`;
        }
    } else {
        if(target > value){
            htmlPara.textContent = `O nosso alvo (${target}) é maior que o valor a meio da lista (${value}). Como a nossa lista não tem mais valores, sabemos agora que não contém o nosso alvo. A busca terminou em apenas ${numSteps} passos!`;
        } else if(target < value){
            htmlPara.textContent = `O nosso alvo (${target}) é menor que o valor a meio da lista (${value}). Como a nossa lista não tem mais valores, sabemos agora que não contém o nosso alvo. A busca terminou em apenas ${numSteps} passos!`;
        }
    }

    htmlPara.style.height = 'auto';
    htmlPara.style.padding = '.6rem';
}

export const shiftMinArrow = function(arrowHtmlElt, htmlArray, divValue){
    // const cellStyles = getComputedStyle(Array.from(document.getElementsByClassName('index'))[0]);
    // const cellWidth = parseStyleStr(cellStyles.width);

    arrowHtmlElt.remove();
    
    console.log(arrowHtmlElt)
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
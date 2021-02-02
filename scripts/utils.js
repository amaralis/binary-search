const utils = {
    colorizeArray: function(targetValue, masterContainer){
        for(const val of masterContainer.children){
            if(val.classList.contains('array-inner-container')){
                for(const val2 of val.children[0].children){
                    if(val2.children[1] && val2.classList.contains(`value-${targetValue}`)){
                        this.colorizeTarget(val2.children[1], 'rgb(0,255,0)');                            
                    }
                    else if(val2.children[1] && !val2.classList.contains(`value-${targetValue}`)){
                        val2.children[1].style = 'background-color: rgba(0,0,0,0);';
                        
                    }
                }
            }
        }
    },

    colorizeTarget: function(htmlElt, color) {
        htmlElt.style = `background-color: ${color};`;
    }
}

export default utils;
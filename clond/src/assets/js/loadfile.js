export default function loadFiles(url, success) {
    if (!window.classcodes) {
        window.classcodes=[];
    }
    let len=url.length;
    //if (typeof url=="object") {
        
    //}
    url.forEach(item=>{
        loadFile(item,function(){
            len--;
            if (len==0&&typeof success=="function") {
                success();
            }
        });
    });
    
}
/*获取文件类型,后缀名，小写*/
function GetFileType(url){
    if(url!=null && url.length>0){
        return url.substr(url.lastIndexOf(".")).toLowerCase();
    }
    return "";
}
function loadFile(url, success) {
    if (!window.classcodes) {
        window.classcodes=[];
    }
    if (!window.classcodesloading) {
        window.classcodesloading={};
    }
    if (!window.successfun) {
        window.successfun={};
    }
    if (classcodesloading[url]) {
        if (!successfun[url]) {
            successfun[url]=[];
        }
        successfun[url].push(success);
        return false;
    }
    
    if (!FileIsExt(classcodes,url)) {
        classcodesloading[url]=true;
        var ThisType=GetFileType(url);
        var fileObj=null;
        

        if(ThisType==".js"){
            fileObj=document.createElement('script');
            fileObj.src = url;
        }else if(ThisType==".css"){
            fileObj=document.createElement('link');
            fileObj.href = url;
            fileObj.type = "text/css";
            fileObj.rel="stylesheet";
        }else if(ThisType==".less"){
            fileObj=document.createElement('link');
            fileObj.href = url;
            fileObj.type = "text/css";
            fileObj.rel="stylesheet/less";
        }
        success = success || function(){};
        fileObj.onload = fileObj.onreadystatechange = function() {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                console.log('qqq');
                console.log(url);
                success();
                if (successfun[url]&&successfun[url].length>0) {
                    for(var i=0,len=successfun[url].length;i<len;i++){
                        successfun[url][i]();
                    }
                }

                classcodes.push(url);
                successfun[url]=[];
                classcodesloading[url]=false;
                //classcodes.push(url)
            }
        }
        document.getElementsByTagName('head')[0].appendChild(fileObj);
    }else{
        success();
    }
}

function FileIsExt(FileArray,_url){
    if(FileArray!=null && FileArray.length>0){
        var len =FileArray.length;
        for (var i = 0; i < len; i++) {
            if (FileArray[i] ==_url) {
               return true;
            }
        }
    }
    return false;
}
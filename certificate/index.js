(function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof exports !== "undefined") {
      factory();
    } else {
      var mod = {
        exports: {}
      };
      factory();
      global.FileSaver = mod.exports;
    }
  })(this, function () {
    "use strict";
  
  
    var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;
  
    function bom(blob, opts) {
      if (typeof opts === 'undefined') opts = {
        autoBom: false
      };else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object');
        opts = {
          autoBom: !opts
        };
      } 
      if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {
          type: blob.type
        });
      }
  
      return blob;
    }
  
    function download(url, name, opts) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
  
      xhr.onload = function () {
        saveAs(xhr.response, name, opts);
      };
  
      xhr.onerror = function () {
        console.error('could not download file');
      };
  
      xhr.send();
    }
  
    function corsEnabled(url) {
      var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker
  
      xhr.open('HEAD', url, false);
  
      try {
        xhr.send();
      } catch (e) {}
  
      return xhr.status >= 200 && xhr.status <= 299;
    } // `a.click()` doesn't work for all browsers (#465)
  
  
    function click(node) {
      try {
        node.dispatchEvent(new MouseEvent('click'));
      } catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
      }
    } // Detect WebView inside a native macOS app by ruling out all browsers
    // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
    // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
  
  
    var isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
    var saveAs = _global.saveAs || ( // probably in some web worker
    typeof window !== 'object' || window !== _global ? function saveAs() {}
    /* noop */
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
    : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
      var URL = _global.URL || _global.webkitURL;
      var a = document.createElement('a');
      name = name || blob.name || 'download';
      a.download = name;
      a.rel = 'noopener'; // tabnabbing
      // TODO: detect chrome extensions & packaged apps
      // a.target = '_blank'
  
      if (typeof blob === 'string') {
        // Support regular links
        a.href = blob;
  
        if (a.origin !== location.origin) {
          corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
        } else {
          click(a);
        }
      } else {
        // Support blobs
        a.href = URL.createObjectURL(blob);
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
        }, 4E4); // 40s
  
        setTimeout(function () {
          click(a);
        }, 0);
      }
    } // Use msSaveOrOpenBlob as a second approach
    : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
      name = name || blob.name || 'download';
  
      if (typeof blob === 'string') {
        if (corsEnabled(blob)) {
          download(blob, name, opts);
        } else {
          var a = document.createElement('a');
          a.href = blob;
          a.target = '_blank';
          setTimeout(function () {
            click(a);
          });
        }
      } else {
        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
      }
    } // Fallback to using FileReader and a popup
    : function saveAs(blob, name, opts, popup) {
      // Open a popup immediately do go around popup blocker
      // Mostly only available on user interaction and the fileReader is async so...
      popup = popup || open('', '_blank');
  
      if (popup) {
        popup.document.title = popup.document.body.innerText = 'downloading...';
      }
  
      if (typeof blob === 'string') return download(blob, name, opts);
      var force = blob.type === 'application/octet-stream';
  
      var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
  
      var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  
      if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
        var reader = new FileReader();
  
        reader.onloadend = function () {
          var url = reader.result;
          url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
          if (popup) popup.location.href = url;else location = url;
          popup = null; 
        };
  
        reader.readAsDataURL(blob);
      } else {
        var URL = _global.URL || _global.webkitURL;
        var url = URL.createObjectURL(blob);
        if (popup) popup.location = url;else location.href = url;
        popup = null; 
  
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 4E4); 
      }
    });
    _global.saveAs = saveAs.saveAs = saveAs;
  
    if (typeof module !== 'undefined') {
      module.exports = saveAs;
    }
  });





  
console.log("hello")
const userName = document.getElementById("idno");
const { PDFDocument, rgb, degrees } = PDFLib;
 
var stlist

async function getstlist()
{
    const data= await  fetch("./attendance.json");
    const tlist= await data.json();
    return tlist;
    
}


async function get()
{
 stlist= await getstlist()

}

get()

function getCert(){
    var vl =document.getElementById("idno").value;
    console.log(stlist);
    console.log(vl);

    var found=stlist.find(function(element) {   
      return element.ID == vl; 
  });  
    console.log(found)


    console.log(found);
    if(found==undefined)
    {
        alert("Invalid ID");
        return;
    }
    var val=found.Name;


    if (val.trim() !== "" && userName.checkValidity()) {
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
}





const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("cert1.pdf").then((res) =>
        res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("font1.ttf").then((res) =>
        res.arrayBuffer()
    );

    const SanChezFont = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const pageWidth = firstPage.getSize().width;
    const pageHeight = firstPage.getSize().height;

    let textSize = 34;
    const maxSize = 90; 

    let textWidth = SanChezFont.widthOfTextAtSize(name, textSize);

    while (textWidth > pageWidth) {
        textSize -= 2; 
        if (textSize < 10) {
            break;
        }
        textWidth = SanChezFont.widthOfTextAtSize(name, textSize);
    }

    const x = (pageWidth - textWidth) / 2+27;
    const y = (pageHeight - textSize) / 2-18;

    firstPage.drawText(name, {
        x: x,
        y: y,
        size: textSize,
        font: SanChezFont,
        color: rgb(0.83, 0.69, 0.22),
    });

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log(pdfDataUri);
    saveAs(pdfDataUri, "Mayavi-Workshop-Participation_Certificate.pdf");
};
    
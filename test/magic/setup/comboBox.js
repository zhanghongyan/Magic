module("magic.setup.comboBox");
//1

test('setup, init from select', function() {
    stop();
    ua.loadcss(upath + 'combobox/combobox.css', function() {
        var d = document.createElement('div');
        d.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
        document.body.appendChild(d);
        var s = baidu.dom.g('s');
        var pos = baidu.dom(s).offset();
        var width = s.offsetWidth;

        var cb = magic.setup.comboBox(s);
        equals(Math.abs(baidu.dom(cb.getElement('container')).offset().left - pos.left) <= 2, true, 'left error in 2px is right.');

        equals(Math.abs(baidu.dom(cb.getElement('container')).offset().top - pos.top) <= 5, true, 'top error in 5px is right.');

        equals(Math.abs(cb.getElement('container').offsetWidth - width - 12) <= 2, true, 'width error in 2px is right.');

        equals($("li", cb.getElement("menu")).text(), "女男", "The content of menu is right");
 
        equals(baidu.dom.getAttr($("li", cb.getElement("menu"))[0], 'data-value'), "f", "The value of menu is right");
        equals(cb.getElement("input").value, '女', "The value of input is right");
        cb.$dispose();
        baidu.dom.remove(d);
        start();
    });
});

//2
test('setup, init from select selected item is the second item', function() {
    var d = document.createElement('div');
    document.body.appendChild(d);
    d.innerHTML = '<select id="s"><option value="f">女</option><option value="m" selected>男</option></select>';
    var s = baidu.dom.g('s');
    var pos = baidu.dom(s).offset();
    var width = s.offsetWidth;
    var cb = magic.setup.comboBox(s, {
        readonly : true
    });
    equals(Math.abs(baidu.dom(cb.getElement('container')).offset().left - pos.left) <= 2, true, 'left error in 2px is right.');
    equals(Math.abs(baidu.dom(cb.getElement('container')).offset().top - pos.top) <= 5, true, 'top error in 5px is right.');
    equals(Math.abs(cb.getElement('container').offsetWidth - width - 12) <= 2, true, 'width error in 2px is right.');
    equals($("li", cb.getElement("menu")).text(), "女男", "The content of menu is right");
    equals(baidu.dom.getAttr($("li", cb.getElement("menu"))[0], 'data-value'), "f", "The value of menu is right");
    equals(cb.getElement("input").value, '男', "The value of input is right");
    cb.$dispose();
    baidu.dom.remove(d);
});

//3
test('setup, init from disabled select', function() {
    var d = document.createElement('div');
    document.body.appendChild(d);
    d.innerHTML = '<select id="s" disabled><option value="f">女</option><option value="m" selected>男</option></select>';
    var s = baidu.dom.g('s');
    var cb = magic.setup.comboBox(s, {
        readonly : true
    });
    equals(baidu.dom.hasClass(cb.getElement('container'), 'magic-combobox-disable'), true, "The disable style is right");
    equals(cb.getElement('input').disabled, true, "input disabled right");
    equals(cb.disabled, true, "instance.disabled is right.");
    cb.$dispose();
    baidu.dom.remove(d);
});

//4
test('setup, change', function() {
    var d = document.createElement('div');
    document.body.appendChild(d);
    d.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var pos = baidu.dom(s).offset();
    var width = s.clientWidth;
    var cb = magic.setup.comboBox(s);
    var change = 0;
    cb.on('change', function(e) {
        change ++;
        switch (change) {
            case 1 :
            case 2 :
            case 4 : 
            equals(s.value, e.result.value, 'value of select is right');
            break;
            case 3 :
            equals(s.value, cb.getElement('input').value, 'value of select is right');
            break;
        } 
    })
    ua.click(cb.getElement('arrow'));
    ua.click($('li', cb.getElement('menu'))[1]);
    ua.click(cb.getElement('arrow'));
    ua.click($('li', cb.getElement('menu'))[0]);
    cb.getElement('input').value = '不男不女';
    cb.blur();
    ua.click(cb.getElement('arrow'));
    ua.click($('li', cb.getElement('menu'))[0]);
    cb.$dispose();
    baidu.dom.remove(d);
});

//5
test('setup, dispose', function() {
    var d = document.createElement('div');
    document.body.appendChild(d);
    d.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var cb = magic.setup.comboBox(s);
    equals(s.style.visibility, 'hidden', 'select is hidden is right');
    cb.$dispose();
    equals(s.style.display, '', 'select is showing is right');
    baidu.dom.remove(d);
});

//6
test("render, default param", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    equals(combobox1._options.items.length, 2, "The items is right");
    combobox1.menu.show();
    equals(combobox1.getElement('menu').getElementsByTagName('LI').length, 2, "The items displayed is right");
    combobox1.menu.hide();
    equals(combobox1._options.originIndex, 0, "The originIndex is right");
    equals(combobox1.getElement('input').value, '女', "The originIndex in readonly=false is right");
    equals(combobox1._options.viewSize, 5, "The viewSize is right");
    equals(combobox1._options.readonly, false, "The readonly is right");
    equals($(combobox1.getElement('input')).attr('readonly'), undefined, "The readonly displayed is right");
    equals(combobox1._options.disabled, false, "The disabled is right");
    equals(combobox1.getElement('input').disabled, false, "The disabled displayed is right");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//7
test("render, all param", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s, {
        'items' : [{
            'value' : 'beijing',
            'content' : '北京'
        },{
            'value' : 'shanghai',
            'content' : '上海'
        },{
            'value' : 'guangzhou',
            'content' : '广州'
        },{
            'value' : 'tianjin',
            'content' : '天津'
        },{
            'value' : 'chongqing',
            'content' : '重庆'
        }],
        'originIndex' : 1,
        'viewSize' : 3,
        'readonly' : true,
        'disabled' : false,
        'width' : 200
    });
    equals(combobox1._options.originIndex, 1, "_options.originIndex is right");
    equals(combobox1._options.viewSize, 3, "_options.viewSize is right");
    equals(combobox1._options.readonly, true, "_options.readonly is right");
    equals(combobox1._options.disabled, false, "_options.disabled is right");
    equals(combobox1._options.width, '200', "_options.width is right");
    equals((function(){
        var res = '';
        for (var i=0, l=combobox1._options.items.length; i<l; i++) {
            res += combobox1._options.items[i].content;
        }
        return res;
    })(), "北京上海广州天津重庆", "_options.items is right");
    
    equals(combobox1.getElement('input').value, '上海', "The item of originIndex displayed in input.");
    equals($("li", combobox1.getElement("menu")).text(), "北京上海广州天津重庆", "The content of menu is right");
    equals($($("li", combobox1.getElement("menu"))[0]).attr('data-value'), "beijing", "The values of menu is right");
    equals(combobox1.getElement('container').clientWidth, 200, "The width is right");
    equals($(combobox1.getElement('input')).attr('readonly'), "readonly", "The readonly displayed is right");
    equals(combobox1.getElement('input').disabled, false, "The disabled displayed is right");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//8
test("render, events", function() {
    expect(31);
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var l1 = baidu._util_.eventBase._getEventsLength();
    var combobox1 = magic.setup.comboBox(s);
    var highlight = pick = change = 0;
    
    combobox1.on("show", function(e, data){
        equals('show', 'show', "The show Event is right");
        equals(this.menu.visible, true, "menu is visible.");
    });

    combobox1.on("hide", function(e, data){
        equals('hide', 'hide', "The hide Event is right");
    });
    combobox1.on("focus", function(e, data){
        equals('focus', 'focus', "The focus Event is right");
    });
    combobox1.on("blur", function(e, data){
        equals('blur', 'blur', "The blur Event is right");
    });
    combobox1.on("highlight", function(e, data){
        highlight ++;
        switch(highlight) {
            case 1 :
            equals(e.index, 0, "The highlight Event is right");
            break;
            case 2 : 
            equals(e.index, 1, "The highlight Event is right");
        }
    });
    combobox1.on("pick", function(e, data){
        pick ++;
        switch(pick) {
            case 1 :
            equals(e.result.value, 'f', "The result.value of pick Event is right");
            equals(e.result.index, 0, "The result.index of pick Event is right");
            equals(e.result.content, '女', "The result.content of pick Event is right");
            break;
            case 2 :
            equals(e.result.value, 'm', "The result.value of pick Event is right");
            equals(e.result.index, 1, "The result.index of pick Event is right");
            equals(e.result.content, '男', "The result.content of pick Event is right");
            break;
        }
        
    });
    combobox1.on("menufocus", function(e, data){
        equals(e.result.value, 'f', "The result.value of menufocus Event is right");
        equals(e.result.index, 0, "The result.value menufocus Event is right");
        equals(e.result.content, '女', "The result.value menufocus Event is right");
    });
    combobox1.on("clickitem", function(e, data){
        equals(e.result.value, 'm', "The result.value of clickitem Event is right");
        equals(e.result.index, 1, "The result.value clickitem Event is right");
        equals(e.result.content, '男', "The result.value clickitem Event is right");
    });
    combobox1.on("confirm", function(e, data){
        equals(e.result.value, 'm', "The result.value of confirm Event is right");
        equals(e.result.index, 1, "The result.value confirm Event is right");
        equals(e.result.content, '男', "The result.value confirm Event is right");
    });
    combobox1.on("change", function(e, data){
        change ++;
        switch (change) {
            case 1 :
            equals(e.from, 'confirm', "The confirm change Event is right");
            equals(e.result.index, 1, "The result.index of confirm change Event is right");
            equals(e.result.value, 'm', "The result.value of confirm change Event is right");
            equals(e.result.content, '男', "The result.content of confirm change Event is right");
            break;
            case 2 :
            equals(e.from, 'blur', "The confirm change Event is right");
        }
        
    });
    combobox1.on("reload", function(e, data){
        equals(combobox1._options.items[0].content, '北京', "The reload Event is right");
    });
    combobox1.on("dispose", function(e, data){
        equals('dispose', 'dispose', "The dispose Event is right");
        var l2 = baidu._util_.eventBase._getEventsLength();
        equals(l2, l1, "The events are un");
    });     
   
    
    ua.click(combobox1.getElement("arrow"));
    ua.click(combobox1.getElement('input'));
    ua.keydown(combobox1.getElement('input'), {
        'keyCode' : 40
    });
    ua.click($('li', combobox1.getElement('menu'))[1]);
    combobox1.getElement('input').value = '不男不女';
    combobox1.blur();
    
    combobox1.reload([{
        'value' : 'beijing',
        'content' : '北京'
    },{
        'value' : 'shanghai',
        'content' : '上海'
    },{
        'value' : 'guangzhou',
        'content' : '广州'
    },{
        'value' : 'tianjin',
        'content' : '天津'
    },{
        'value' : 'chongqing',
        'content' : '重庆'
    }]);
    combobox1.$dispose();
    document.body.removeChild(div1);
});


//9
test('render event beforeshow beforehide', function() {
    expect(9);
    stop();
    ua.importsrc('baidu.lang.Class.$removeEventListener', function() {
        
        var div1 = document.createElement("div");
        document.body.appendChild(div1);
        div1.id = "div1";
        div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
        var s = baidu.dom.g('s');
        var combobox1 = magic.setup.comboBox(s);
        
        function f1(e) {
            equals('beforeshow', 'beforeshow', "The beforeshow Event is right");
            e.returnValue = false;
        }
        function f2(e) {
            equals('beforehide', 'beforehide', "The beforehide Event is right");
            e.returnValue = false;
        }
        combobox1.on('show', function() {
            equals('show', 'show', 'show event fired');
        });
        combobox1.on('hide', function() {
            equals('hide', 'hide', 'hide event fired');
        });
        combobox1.on("beforeshow", f1);
        combobox1.on("beforehide", f2);
        ua.click(combobox1.getElement('arrow'));
        equals(combobox1.menu.visible, false, "The beforeshow Event prevent show event is right");
        combobox1.un("beforeshow", f1);
        ua.click(combobox1.getElement('arrow'));
        equals(combobox1.menu.visible, true, "showing is right");
        ua.click($('li', combobox1.getElement('menu'))[0]);
        equals(combobox1.menu.visible, true, "The beforehide Event prevent hide event is right");
        combobox1.un("beforehide", f2);
        ua.click($('li', combobox1.getElement('menu'))[0]);
        equals(combobox1.menu.visible, false, "hiding is right");
        combobox1.$dispose();
        document.body.removeChild(div1);
        start();           
    }, 'baidu.lang.Class.$removeEventListener', 'magic.ComboBox');
 
});

test('render event beforepick', function() {
    expect(4);
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    function f1(e) {
        equals('beforepick', 'beforepick', "The beforepick Event is right");
        e.returnValue = false;
    }
    combobox1.on("beforepick", f1);
    combobox1.on("pick", function(e) {
        equals(e.result.value, 'm', 'result.value of pick event.');
    });
    ua.click(combobox1.getElement('arrow'));
    ua.click($('li', combobox1.getElement('menu'))[1]);
    equals(combobox1.getElement('input').value, '女', "The beforepick Event prevent pick event is right");
    combobox1.un("beforepick", f1);
    ua.click(combobox1.getElement('arrow'));
    ua.click($('li', combobox1.getElement('menu'))[1]);
    equals(combobox1.getElement('input').value, '男', "pick event is right");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//10
test("render, getValue", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.focus();
    combobox1.getElement('input').value = 'abc';
    combobox1.blur();
    equals(combobox1.getValue(), 'abc', "getValue(), input a value which not in the menu, is right.");
    combobox1.focus();
    combobox1.getElement('input').value = '男';
    combobox1.blur();
    equals(combobox1.getValue(), 'm', "getValue(), input a value which in the menu, is right.");
    ua.click(combobox1.getElement('arrow'));
    ua.click($('li', combobox1.getElement('menu'))[0]);
    equals(combobox1.getValue(), 'f', "getValue(), click a item in the menu, is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//11
test("render, getSelectIndex", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var input = combobox1.getElement('input');
    combobox1.focus();
    $(input).attr('value', 'abc');
    combobox1.blur();
    equals(combobox1.getSelectIndex(), -1, "getSelectIndex(), input a value which not in the menu, is right.");
    ua.click(combobox1.getElement('arrow'));
    ua.click($('li', combobox1.getElement('menu'))[0]);
    equals(combobox1.getSelectIndex(), '0', "getSelectIndex(), click a item in the menu, is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});


//12
test("render, setByValue", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.setByValue('m');
    var input = combobox1.getElement('input');
    equals(combobox1.getElement('input').value, '男', "setByValue(), the value in the inputbox is right.");
    equals(combobox1.getValue(), 'm', "setByValue(), getValue() == 'm' is right.");
    equals(combobox1.selectValue, 'm', "selectValue is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//13
test("render, focus", function(){
    expect(2);
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var focus = 0;
    combobox1.on('focus', function() {
        focus ++;
        switch (focus) {
            case 1 :
            equals('focus once', 'focus once', "focus is right.");
            equals(combobox1.isFocus, true, "instance.isFocus is right.");
            break;
            case 2 :
            equals('only focus once', 'focus twice', "focus is wrong.");
            break;
        }
        
    });
    combobox1.focus();
    combobox1.focus();
    ua.click(combobox1.getElement('arrow'));
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//14
test("render, blur", function(){
    expect(2);
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var blur = 0;
    combobox1.on('blur', function() {
        blur ++;
        switch (blur) {
            case 1 :
            equals('blur once', 'blur once', "blur is right.");
            equals(combobox1.isFocus, false, "instance.isFocus is right.");
            break;
            case 2 :
            equals('blur twice', 'only blur once', "blur is wrong.");
            break;
        }
        
    });
    combobox1.focus();
    combobox1.blur();
    combobox1.blur();
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//15
test("render, reset", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m" select>男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.focus();
    combobox1.getElement('input').value = 'abx';
    combobox1.blur();
    combobox1.reset();
    equals(combobox1.getElement('input').value, '女', "input value is right.");
    equals(combobox1.getValue(), 'f', "getValue() is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test("render, reset originIndex=-1 readonly=false", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m" select>男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s, {
        originIndex : -1
    });
    combobox1.getElement('input').value = 'abx';
    combobox1.reset();
    equals(combobox1.getElement('input').value, '', "input value is right.");
    equals(combobox1.getValue(), '', "getValue() is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test("render, reset originIndex=-1 readonly=true", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m" select>男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s, {
        originIndex : -1,
        readonly : true
    });
    combobox1.getElement('input').value = 'abx';
    combobox1.reset();
    equals(combobox1.getElement('input').value, '女', "input value is right.");
    equals(combobox1.getValue(), 'f', "getValue() is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//16
test("render, reload", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var reloadData = [{
        'value' : 'beijing',
        'content' : '北京'
    },{
        'value' : 'shanghai',
        'content' : '上海'
    },{
        'value' : 'guangzhou',
        'content' : '广州'
    },{
        'value' : 'tianjin',
        'content' : '天津'
    },{
        'value' : 'chongqing',
        'content' : '重庆'
    }];
    combobox1.reload(reloadData);
    equals(combobox1._options.items[0].value, "beijing", "The _options.items is right");
    equals($("li", combobox1.getElement("menu")).text(), "北京上海广州天津重庆", "menu is right");
    //equals(combobox1.getElement('input').value, '', "input value is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//17
test("render, disable", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.disable();
    equals(baidu.dom.hasClass(combobox1.getElement('container'), 'magic-combobox-disable'), true, "The disable style is right");
    equals(combobox1.getElement('input').disabled, true, "input disabled right");
    equals(combobox1.disabled, true, "instance.disabled is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//18
test("render, enable", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s" disabled><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.enable();
    equals(baidu.dom.hasClass(combobox1.getElement('container'), 'magic-combobox-disable'), false, "The enable style is right");
    equals(combobox1.getElement('input').disabled, false, "input enable right");
    equals(combobox1.disabled, false, "instance.disabled is right.");
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//19
test("render, setWidth", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.setWidth(200);
    equals(combobox1.getElement('container').clientWidth, 200, 'width of input container is right');
    ua.click(combobox1.getElement('arrow'));
    equals(combobox1.getElement('menu').clientWidth, 200, 'width of menu is right');
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//20
test("render, dispose", function() {
    stop();
    ua.importsrc('baidu.array.indexOf,baidu.dom.contains', function() {
        var div1 = document.createElement("div");
        document.body.appendChild(div1);
        div1.id = "div1";
        div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
        var s = baidu.dom.g('s');
        var combobox1 = magic.setup.comboBox(s);
        var comboid = combobox1.guid,
            popguid = combobox1.menu.guid,
            popdomid = combobox1.menu.$getId(),
            container = combobox1.getElement('container'),
            menu = combobox1.getElement('menu');
        equals(true, !!baiduInstance(popguid), 'popup is created.');
        equals(0, baidu.array.indexOf(magic.control.ComboBox.instanceArray, comboid), 'guid is added in global array.')
        ua.click(combobox1.getElement('arrow'));
        combobox1.$dispose();
        equals(baidu.dom.contains(document.body, container), false, 'container is removed');
        equals(baidu.dom.contains(document.body, menu), false, 'menu is removed');
        equals(baidu.dom.g(popdomid).style.display, 'none', 'popup is hidden');
        equals(undefined, baiduInstance(popguid), 'popup is disposed.');
        equals(-1, baidu.array.indexOf(magic.control.ComboBox.instanceArray, comboid), 'guid is removed from global array.')
        document.body.removeChild(div1);
        start();        
    }, 'baidu.array.indexOf', 'magic.ComboBox');
 
});

//21
test("render, keyboard action", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var focus = 0;
    combobox1.on('menufocus', function(e) {
        focus ++;
        switch (focus) {
            case 1 :
            equals(e.result.value, 'f', 'down keydown once right');
            equals(this.menu.visible, true, 'menu is showing');
            break;
            case 2 :
            equals(e.result.value, 'm', 'down keydown twice right');
            break;
            case 3 :
            equals(e.result.value, 'f', 'down keydown 4 times right');
            break;
            case 4 :
            equals(e.result.value, 'm', 'up keydown twice right');
            break;                   
        }
    });
    combobox1.on('confirm', function(e) {
        equals(e.result.value, 'm', 'enter keydown right');
        equals(this.menu.visible, false, 'menu is hiding');
    });
    var input = combobox1.getElement('input');
    input.value = 'abc';
    ua.click(input);
    ua.keydown(input, {
        'keyCode' : 40
    });
    ua.keydown(input, {
        'keyCode' : 40
    });
    ua.keydown(input, {
        'keyCode' : 40
    });
    equals(input.value, 'abc', "The input value is right");
    ua.keydown(input, {
        'keyCode' : 40
    });
    ua.keydown(input, {
        'keyCode' : 38
    });
    equals(input.value, 'abc', "The input value is right");
    ua.keydown(input, {
        'keyCode' : 38
    });
    ua.keydown(input, {
        'keyCode' : 13
    });     
    combobox1.$dispose();
    document.body.removeChild(div1);
});

//22
test("render, mouse action in readonly = false combobox", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    var mouseover = 0;
    combobox1.on('highlight', function(e) {
        mouseover ++;
        switch (mouseover) {
            case 1 :
            equals(e.index, 0, 'The mouseover action is right');
            equals(baidu.dom.hasClass($('li', combobox1.getElement('menu'))[0], 'magic-combobox-menu-item-hover'), true, 'The highlight style is right');
            break;
            case 2 :
            equals(e.index, 1, 'The mouseover action is right');
            equals(baidu.dom.hasClass($('li', combobox1.getElement('menu'))[0], 'magic-combobox-menu-item-hover'), false, 'clearHighlight is right');
            equals(baidu.dom.hasClass($('li', combobox1.getElement('menu'))[1], 'magic-combobox-menu-item-hover'), true, 'The highlight style is right');
            break;
        }
        
    });
    combobox1.on('confirm', function(e) {
        equals(e.result.value, 'm', 'the click action is right');
    });
    
    combobox1.on('blur', function() {
        equals(1, 1, 'blur!!');
    });
    ua.click(combobox1.getElement('input'));
    equals(combobox1.menu.visible, false, "the menu dosn't show is right");
    ua.click(combobox1.getElement('arrow'));
    equals(combobox1.menu.visible, true, "The menu is showing is right");
    equals($('li', combobox1.getElement('menu')).length, 2, 'all the items are showing');
    ua.mouseover($('li', combobox1.getElement('menu'))[0]);
    ua.mouseover($('li', combobox1.getElement('menu'))[1]);
    ua.click($('li', combobox1.getElement('menu'))[1]);
    ua.click(combobox1.getElement('arrow'));
    equals(combobox1.menu.visible, true, "The menu is showing is right");
    stop();
    setTimeout(function() {
        ua.click(document);
        equals(combobox1.menu.visible, false, "the menu dosn't show is right");
        combobox1.$dispose();
        document.body.removeChild(div1);
        start();
    }, 50);
});

test('render mouse action in readonly = true combobox', function() {
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="f">女</option><option value="m">男</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s, {
        readonly : true
    });
    ua.click(combobox1.getElement('input'));
    equals(combobox1.menu.visible, true, "the menu is showing");
    equals($('li', combobox1.getElement('menu')).length, 2, 'all the items are showing');
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test("render, viewSize", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s, {
        'viewSize' : 3
    });
    combobox1.menu.show();
    var single = $('li', combobox1.getElement('menu'))[0];
    var singleHeight = Math.max(single.offsetHeight, single.offsetHeight);
    equals(combobox1.getElement('menu').offsetHeight, singleHeight * 3 + 1, 'when the number of items is more than viewSize, only viewSize of the items will be show, and there will be scroll.');
    combobox1.menu.hide();
    combobox1.reload([{
        'value' : 'f', 'content' : '女'
    }, {
        'value' : 'm', 'content' : '男'
    }]);
    combobox1.menu.show();
    equals(combobox1.getElement('menu').offsetHeight, singleHeight * 2 + 2, 'If number of items is less than viewSize, the viewSize is useless.')
    combobox1.$dispose();
    document.body.removeChild(div1);
});

function getSelectedText(s) {
    for (var l = s.options.length; l --;) {
        if (s.options[l].selected) {
            return s.options[l].text;
        }
    }    
}

test("setup, setByValue should change origin select's value.", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.setByValue('shanghai');
    equals(s.value, 'shanghai', 'test origin select\'s value should change to "shanghai".');
    equals(getSelectedText(s), '上海', 'test origin select\'s text should change to "上海".');
    combobox1.reset();
    equals(s.value, 'beijing', 'test origin select\'s value should reset to "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test("setup, setByIndex should change origin select's value.", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.$setByIndex(1);
    equals(s.value, 'shanghai', 'test origin select\'s value should change to "shanghai".');
    equals(getSelectedText(s), '上海', 'test origin select\'s text should change to "上海".');
    combobox1.reset();
    equals(s.value, 'beijing', 'test origin select\'s value should reset to "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test("setup, ComboBox reload action should reload origin select too.", function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.reload([{
        'value' : 'f', 'content' : '女'
    }, {
        'value' : 'm', 'content' : '男'
    }]);
    equals(s.value, 'f', 'test origin select\'s value should be "f".');
    equals(getSelectedText(s), '女', 'test origin select\'s text should be "女".');
    combobox1.setByValue('m');
    equals(s.value, 'm', 'test origin select\'s value should change to "m".');
    equals(getSelectedText(s), '男', 'test origin select\'s text should be "男".');
    combobox1.$dispose();
    document.body.removeChild(div1);
});

test('use keyboard select items, press enter should be right while select the last item and continue to press down once', function() {
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.comboBox(s);
    combobox1.getElement('input').value = 'my value';
    ua.keydown(combobox1.getElement('input'), {
        keyCode : 40
    });
    ua.keydown(combobox1.getElement('input'), {
        keyCode : 40
    });
    ua.keydown(combobox1.getElement('input'), {
        keyCode : 40
    });
    ua.keydown(combobox1.getElement('input'), {
        keyCode : 13
    });
    equals(combobox1.getElement('input').value, 'my value', 'should be \'my value\'');
    combobox1.$dispose();
    document.body.removeChild(div1);
});
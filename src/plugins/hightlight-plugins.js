import Vue from 'vue';
import Hljs from 'highlight.js'
import 'highlight.js/styles/stackoverflow-dark.css' // 样式文件

let Highlight = {};
Highlight.install = function(Vue, options) {
    Vue.directive('highligh', function(el) {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block, index) => {
            /** 代码高亮 */
            Hljs.highlightBlock(block);
            /** 手动添加一个hljs类名，防止不支持的语言背景变空白 */
            block.classList.add('hljs');
        })
    })
}

export default Highlight;

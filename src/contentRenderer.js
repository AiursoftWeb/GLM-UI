import './main.css'

import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import markdownRenderFactory from "markdown-it";
const contentRenderer = markdownRenderFactory({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><span><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></span></pre>"
        );
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
  },
});

export { contentRenderer };

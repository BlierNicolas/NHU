webpackJsonp([0x923310cdd759],{130:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var o=a(2),c=r(o),f=a(3),d=r(f);a(10);var i=a(8),s=function(e){function t(){return l(this,t),n(this,e.apply(this,arguments))}return u(t,e),t.prototype.render=function(){var e=this.props.data.contentfulChapitre,t=e.titreChapitre,a=e.texte,r=e.chapitreAvant,l=e.chapitreApres,n=e.nomRoman;return console.log(r),console.log(l),c.default.createElement(i.Container,{fluid:"true"},c.default.createElement(i.Row,null,c.default.createElement(i.Col,{lg:{size:8,offset:2}},c.default.createElement("div",null,c.default.createElement(i.Breadcrumb,null,c.default.createElement(i.BreadcrumbItem,null,c.default.createElement("a",{href:"../../"},"Page d'accueil")),c.default.createElement(i.BreadcrumbItem,null,c.default.createElement("a",{href:"../../ListeDesHistoires"},"Liste des histoires")),c.default.createElement(i.BreadcrumbItem,null,c.default.createElement("a",{href:n},"Roman")),c.default.createElement(i.BreadcrumbItem,{active:!0},t))),c.default.createElement(i.Card,null,c.default.createElement(i.CardBody,null,c.default.createElement(i.CardText,null,c.default.createElement("h1",{className:"page-header text-center"},t),c.default.createElement("div",{className:"text-justify",dangerouslySetInnerHTML:{__html:a.childMarkdownRemark.html}})))))),c.default.createElement(i.Row,null,c.default.createElement(i.Col,{lg:{size:8,offset:2}},c.default.createElement(i.Card,null,c.default.createElement(i.CardBody,null,c.default.createElement(i.CardText,null,c.default.createElement(i.Row,null,c.default.createElement(i.Col,{xs:"4",className:"text-center"},r?c.default.createElement(i.Button,{color:"primary",href:r},"Chapitre précédent"):""),c.default.createElement(i.Col,{xs:"4",className:"text-center"},c.default.createElement(i.Button,{color:"primary",href:n},"Retourner au roman")),c.default.createElement(i.Col,{xs:"4",className:"text-center"},l?c.default.createElement(i.Button,{color:"primary",href:l},"Chapitre suivant"):""))))))))},t}(o.Component);s.propTypes={data:d.default.object.isRequired},t.default=s;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-chapitre-js-1f5d362f7a7e3bc241c8.js.map
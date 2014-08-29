/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

/* global window */
// expost React globally for DevTools
window.React = React;

var EtherExApp = require("./components/EtherExApp");

var Placeholder = require("./components/Placeholder");

// var Trades = require("./components/Trades");
// var TradeStore = require("./stores/TradeStore");
// var TradeActions = require("./actions/TradeActions");
// var TradeDetails = require("./components/TradeDetails");

// var References = require("./components/References");
// var ReferenceStore = require("./stores/ReferenceStore");
// var ReferenceActions = require("./actions/ReferenceActions");

// var Contacts = require("./components/Contacts");
// var ContactStore = require("./stores/ContactStore");
// var ContactActions = require("./actions/ContactActions");
// var ContactDetails = require("./components/ContactDetails");

var UserStore = require("./stores/UserStore");
var UserActions = require("./actions/UserActions");

var MarketStore = require("./stores/MarketStore");
var MarketActions = require("./actions/MarketActions");

// TODO mock data
var fixtures = require("./js/fixtures");

var Firebase = require("Firebase");
var FirebaseClient = require("./clients/FirebaseClient");

// Load jQuery and bootstrap
var jQuery = require("jquery");
window.$ = window.jQuery = jQuery;

require("bootstrap/dist/js/bootstrap.js");
// require("bootstrap/dist/css/bootstrap.min.css");
require("./css/bootstrap-darkly.css");
// require("bootstrap/dist/css/bootstrap-theme.min.css");

require("./css/rickshaw.min.css");
require("./css/styles.css");

var Ethereum = require("ethereumjs-lib");
window.Ethereum = Ethereum;

if (!ethBrowser) {
  var bigInt = require("./js/eth/BigInteger.js");
  window.bigInt = bigInt;

  require("./js/eth/ethString.js");

  var eth = require("./js/eth/eth.js");
  window.eth = eth;

  eth.stateAt = eth.storageAt;
  eth.messages = function() { return {}; };
  eth.toDecimal = function(x) { return x.dec(); };
}

require("./js/scripts.js");
EtherEx.loadMarkets();

var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var stores = {
  // TradeStore: new TradeStore({trades: fixtures.trade}),
  // ReferenceStore: new ReferenceStore({references: fixtures.referencesList}),
  // ContactStore: new ContactStore({contacts: fixtures.contacts}),
  UserStore: new UserStore({user: fixtures.user}),
  MarketStore: new MarketStore({market: fixtures.market}),
};

var actions = {
    // trade: TradeActions,
    // reference: ReferenceActions,
    // contact: ContactActions,
    user: UserActions,
    market: MarketActions
};

var flux = new Fluxxor.Flux(stores, actions);

var routes = (
  <Routes>
    <Route handler={EtherExApp} flux={flux}>
      <Redirect from="/" to="trades" />
      <Route name="trades" path="/trades" handler={Placeholder} flux={flux} />
      <Route name="tradeDetails" path="/trade/:tradeId" handler={Placeholder} flux={flux} />
      <Route name="wallet" path="/wallet" handler={Placeholder} flux={flux} />
      <Route name="contacts" path="/contacts" handler={Placeholder} flux={flux} />
      <Route name="contactDetails" path="/contact/:contactId" handler={Placeholder} flux={flux} />
      <Route name="settings" path="/settings" handler={Placeholder} flux={flux} />
      <Route name="help" path="/help" handler={Placeholder} flux={flux} />
      <Route name="notfound" path="/notfound" handler={Placeholder} title="Contact or Trade ID not found" flux={flux} />
    </Route>
  </Routes>
);

/* global document */
React.renderComponent(routes, document.getElementById("app"));

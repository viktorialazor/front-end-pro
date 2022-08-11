class Tabs {
  #rootElement;

  static CLASS_TABS = 'tabs';
  static CLASS_TABS_NAV = 'tabs-nav';
  static CLASS_TABS_CONTENT = 'tabs-content';
  static CLASS_TAB_BTN = 'tab-btn';
  static CLASS_TAB_PANE = 'tab-pane';
  static CLASS_ACTIVE = 'active';

  constructor(rootElement) {
    this.#rootElement = rootElement;
    [this.tabsNavElement, this.tabsContentElement] = this.#rootElement.children;
    this.tabBtnList = this.tabsNavElement.children;
    this.tabPaneList = this.tabsContentElement.children;
    this.tabAmount = this.tabsNavElement.children.length;
    this.activeTabIndex = 0;

    this.addStyleClasses();
    this.bindEvents();
  }

  addStyleClasses() {
    this.#rootElement.classList.add(Tabs.CLASS_TABS);
    this.tabsNavElement.classList.add(Tabs.CLASS_TABS_NAV);
    this.tabsContentElement.classList.add(Tabs.CLASS_TABS_CONTENT);

    for (let i = 0; i < this.tabAmount; i++) {
      this.tabBtnList[i].classList.add(Tabs.CLASS_TAB_BTN);
      this.tabPaneList[i].classList.add(Tabs.CLASS_TAB_PANE);
    }
    
    this.tabBtnList[this.activeTabIndex].classList.add(Tabs.CLASS_ACTIVE);
    this.tabPaneList[this.activeTabIndex].classList.add(Tabs.CLASS_ACTIVE);
  };

  bindEvents() {
    this.#rootElement.addEventListener('click', (e) => this.onRootElementClick(e));
  };

  onRootElementClick(e) {
    if (e.target.tagName === 'BUTTON') {
      this.changeActiveTab(e.target);
    }
  };

  changeActiveTab(element) {
    for (let i = 0; i < this.tabAmount; i++) {
      if (this.tabBtnList[i] === element) {
        this.activeTabIndex = i;
      }
    }

    for (let i = 0; i < this.tabAmount; i++) {
      if (i !== this.activeTabIndex) {
        this.hideActiveClass(this.tabBtnList[i], Tabs.CLASS_ACTIVE);
        this.hideActiveClass(this.tabPaneList[i], Tabs.CLASS_ACTIVE);
      }
    }

    this.addActiveClass(this.tabBtnList[this.activeTabIndex], Tabs.CLASS_ACTIVE);
    this.addActiveClass(this.tabPaneList[this.activeTabIndex], Tabs.CLASS_ACTIVE);
  };

  hideActiveClass(element, activeClass) {
    element.classList.remove(activeClass);
  };

  addActiveClass(element, activeClass) {
    element.classList.add(activeClass);
  };
};

export default Tabs;

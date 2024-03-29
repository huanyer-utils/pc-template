function emptyAction(...args: any) {
  // 警告：提示当前使用的是空 Action
  console.warn('无微前端方法注入!');
}

class Actions {
  // 默认值为空 Action
  actions: any = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions
   */
  setActions(actions: any) {
    this.actions = actions;
  }

  /**
   * 映射
   */
  onGlobalStateChange(...args: any) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 映射
   */
  setGlobalState(...args: any) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;

// 商品数据
class GoodsItem {
  constructor(g) {
    this.data = g;
    this.choose = 0;
  }
}
// 整个界面数据
class UIData {
  constructor(g) {
    this.data = g.map((goods) => new GoodsItem(goods));
    this.deliveryShould = 30;
    this.deliveryPrice = 5;
  }

  // 添加某件商品数量
  increase(index) {
    this.data[index].choose++;
  }
  // 减少某件商品数量
  decrease(index) {
    !!this.data[index].choose && this.data[index].choose--;
  }
  // 获取总价
  getTotalPrice() {
    return this.data.reduce((pre, cur) => {
      return pre + cur.choose * cur.data.price;
    }, 0);
  }
  // 获取选中商品总数量
  getTotalChooseNumber() {
    return this.data.reduce((pre, cur) => {
      return pre + cur.choose;
    }, 0);
  }
  // 是否选中商品
  getIsHasChoose() {
    return this.getTotalChooseNumber() > 0;
  }
  // 是否满配送费
  getIsShouldDelivery() {
    return this.getTotalPrice() >= this.deliveryShould;
  }
}

// 界面操作
class UI {
  constructor(g) {
    this.uiData = new UIData(g);
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      totalDom: document.querySelector(".total"),
      deliveryPriceDom: document.querySelector(".delivery-price"),
      needPriceDom: document.querySelector(".need-price"),
    };
  }

  // 创建商品元素
  createHtml() {
    let html = "";
    console.log("this.uiData", this.uiData);
    for (let i = 0; i < this.uiData.data.length; i++) {
      const item = this.uiData.data[i];
      html += `<li>
        <div>${item.data.title}</div>
        <div>${item.data.price}</div>
        <div class="btn-info">
          <div class="btn btn-dec">-</div>
          <div class="choose">${item.choose}</div>
          <div class="btn btn-inc">+</div>
        </div>
      </li>`;
    }
    this.doms.goodsContainer.innerHTML = html;
  }
  // 增加某件商品
  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateBill();
  }
  // 减少某件商品
  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateBill();
  }
  // 更新某个商品的状态
  updateGoodsItem(index) {
    const goodsItem = this.doms.goodsContainer.children[index];
    // 更新数量
    const chooseDom = goodsItem.querySelector(".choose");
    chooseDom.textContent = this.uiData.data[index].choose;
  }

  // 更新结算栏状态
  updateBill() {
    const total = this.uiData.getTotalPrice();
    const needPrice = this.uiData.deliveryShould - total;
    this.doms.totalDom.textContent = `商品费用：${total}元`;
    this.doms.deliveryPriceDom.textContent = `配送费：${this.uiData.deliveryPrice}元`;
    this.doms.needPriceDom.textContent = `还差${needPrice >= 0 ? needPrice : 0}元起送`;
  }
}

// 初始化
const ui = new UI(goodsData);
// 创建商品元素
ui.createHtml();
// 注册事件
ui.doms.goodsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-inc")) {
    const index = +e.target.getAttribute("index");
    ui.increase(index);
  }
  if (e.target.classList.contains("btn-dec")) {
    const index = +e.target.getAttribute("index");
    ui.decrease(index);
  }
});

import "./App.css";
import React from "react";
import Model from "./Model";

const mockData = [
  { id: 1, date: "2023-12-01", name: "订单一", status: 0 },
  { id: 2, date: "2023-12-02", name: "订单二", status: 1 },
  { id: 3, date: "2023-12-03", name: "订单三", status: 2 },
];
const statusMap = [
  { text: "进行中", color: "blue" },
  { text: "已完成", color: "green" },
  { text: "已延期", color: "red" },
];

class SearchTableList extends React.PureComponent {
  state = {
    isShow: false,
    tableList: [],
    searchParams: {
      date: "",
      name: "",
      status: 0,
    },
    modelParams: {
      date: "",
      name: "",
      status: 0,
    },
  };
  componentDidMount() {
    // 页面挂载请求数据
    this.getTableList();
  }
  // 模拟接口数据
  mockAxiosGet = (params = this.state.searchParams) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 目前先支持日期单项查询
        if (params.date) {
          resolve({
            code: 200,
            data: mockData.filter((e) => e.date.indexOf(params.date) != -1),
            message: "请求成功",
          });
        } else {
          resolve({
            code: 200,
            data: mockData,
            message: "请求成功",
          });
        }
      }, 200);
    });
  };
  // 模拟获取数据
  getTableList = () => {
    this.mockAxiosGet().then((res) => {
      if (res.code == 200) {
        this.setState(
          {
            tableList: [...res.data],
          },
          () => {
            console.log("请求成功，数据为：", res.data);
          }
        );
      } else {
        alert("请求失败");
      }
    });
  };
  handleDelete = (id) => {
    const idx = mockData.findIndex((v) => v.id == id);
    mockData.splice(idx, 1);
    console.log(mockData);
    this.getTableList();
  };
  handleEdit = (e) => {
    this.setState({
      isShow: true,
      modelParams: { ...e },
    });
  };
  handleAdd = () => {
    this.setState({
      isShow: true,
    });
  };
  handleConfirm = () => {
    if (this.state.modelParams.id) {
      mockData.forEach((e, i) => {
        if (e.id == this.state.modelParams.id) {
          mockData[i] = this.state.modelParams;
        }
      });
      this.getTableList();
    } else {
      mockData.push({ id: Math.random() * 100, ...this.state.modelParams });
      this.getTableList();
    }
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      isShow: false,
      modelParams: {
        date: "",
        name: "",
        status: 0,
      },
    });
  };

  render() {
    return (
      <div className="container">
        <div className="search-box">
          <div>
            日期：
            <input
              value={this.state.searchParams.date}
              onInput={(e) => {
                this.setState({
                  searchParams: {
                    ...this.state.searchParams,
                    date: e.target.value,
                  },
                });
              }}
            ></input>
          </div>
          <div>
            订单名：
            <input
              value={this.state.searchParams.name}
              onInput={(e) => {
                this.setState({
                  searchParams: {
                    ...this.state.searchParams,
                    name: e.target.value,
                  },
                });
              }}
            ></input>
          </div>
          <div>
            状态：
            <select
              value={this.state.searchParams.status}
              onChange={(e) => {
                this.setState({
                  searchParams: {
                    ...this.state.searchParams,
                    status: e.target.value,
                  },
                });
              }}
            >
              {statusMap.map((item, index) => {
                return (
                  <option key={index} value={index}>
                    {item.text}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={this.getTableList}>查询</button>
          <button
            onClick={() => {
              this.setState(
                {
                  searchParams: {
                    date: "",
                    name: "",
                    status: 0,
                  },
                },
                () => {
                  this.getTableList();
                }
              );
            }}
          >
            重置
          </button>
          <button onClick={this.handleAdd.bind(this)}>新增</button>
        </div>
        <table>
          <thead>
            <tr>
              <td>日期</td>
              <td>订单名</td>
              <td>订单状态</td>
              <td>操作</td>
            </tr>
          </thead>

          <tbody>
            {this.state.tableList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.name}</td>
                  <td
                    style={{
                      color: statusMap[item.status].color,
                    }}
                  >
                    {statusMap[item.status].text}
                  </td>
                  <td>
                    <button onClick={this.handleDelete.bind(this, item.id)}>删除</button>
                    <button onClick={this.handleEdit.bind(this, item)}>编辑</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 弹窗 */}
        {this.state.isShow ? (
          <Model title={this.state.modelParams.id ? "新增" : "编辑"} confirm={this.handleConfirm} cancel={this.handleCancel}>
            <div>
              日期：
              <input
                value={this.state.modelParams.date}
                onInput={(e) => {
                  this.setState({
                    modelParams: {
                      ...this.state.modelParams,
                      date: e.target.value,
                    },
                  });
                }}
              ></input>
            </div>
            <div>
              订单名：
              <input
                value={this.state.modelParams.name}
                onInput={(e) => {
                  this.setState({
                    modelParams: {
                      ...this.state.modelParams,
                      name: e.target.value,
                    },
                  });
                }}
              ></input>
            </div>
            <div>
              状态：
              <select
                value={this.state.modelParams.status}
                onChange={(e) => {
                  this.setState({
                    modelParams: {
                      ...this.state.modelParams,
                      status: e.target.value,
                    },
                  });
                }}
              >
                {statusMap.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </Model>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SearchTableList;

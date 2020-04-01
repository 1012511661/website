/**
 * author: yognwehao
 * date: 2020/03/25 17:22:26
 * describe: vue render
 */

/**
 * 判断是否可以点击
 * @param params
 * @param key
 * @returns {boolean}
 */
function isClickFun(params, key) {
    return params.row.hasOwnProperty(key) && !params.row[key]
}

//通用 操作渲染
export function operation(operationList) {
    return (h, params) => {
        let buttonList = [];
        for (let i = 0; i < operationList.length; i++) {
            let isClick = isClickFun(params, operationList[i].key);
            if (operationList[i].hide && isClick) {
                continue
            }
            buttonList.push(h(
                "m-text",
                {
                    props: {
                        color: isClick ? "light" : "primary"
                    },
                    style: {
                        cursor: isClick ? "not-allowed" : "pointer",
                    },
                    on: {
                        click: () => {
                            if (!isClick)
                                operationList[i].onClick(params)
                        }
                    }
                },
                operationList[i].title
            ));
            buttonList.push(h(
                "div",
                {
                    style: {
                        width: "1px",
                        height: "14px",
                        backgroundColor: "#8A8C92",
                        marginLeft: "8px",
                        marginRight: "8px",
                        lineHeight: "14px"
                    }
                }
            ))
        }
        buttonList.pop();
        return h(
            "div",
            {
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap"
                }
            },
            buttonList
        )
    }
}

//删除一个对象里面的空属性（深度）
export function deleteEmptyKey(obj) {
    obj = JSON.parse(JSON.stringify(obj))
    for (let key in obj) {
        if (obj[key] !== null && typeof obj[key] == 'object') {
            deleteEmptyKey(obj[key])
        } else {
            if (obj[key] === '' || obj[key] === undefined) {
                delete obj[key]
            }
        }
    }
    return obj
}
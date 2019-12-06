## 入参：

# action [string][*] 获取客户端上传 oss 令牌 url

# onChange [func][*] 上传成功、失败，删除的回调函数

    返回：files
    files的当前操作文件：
    {
        file, //当前操作的文件对象，status的状态有'done','error'
        fileList //展示中的文件列表

# token [string][*] 用户 token

# fileList [array] 初始有的列表数组

# max [int] 允许上传的最大大小 单位兆 M

# resCdn [string] 下载地址的前缀域名，默认为https://res.shiguangkey.com

# dirPrefix [string] 业务名、前缀 默认“homework”

# {children} 自定义按钮 dom ,不传则为默认

# type [array] 允许上传的文件格式（以 file 文件对象的 type 属性值来判断的)

# beforeUpload [function] 上传文件之前的钩子，参数为上传的文件对象，若返回 false 则停止上传。

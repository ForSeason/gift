# 变量说明

* id，password，nickname，sex，adress， phone之类的不用说了吧
* createTime是时间戳，由于前后端时间单位不一样，前端使用的时候记得在我的时间戳后加两个0
* headPic指头像
* eid是event_id的简称，而event指失物招领和寻物启事
* rid是room_id的简称，在后端里评论区和用户的聊天室是公用一个表的，他们的rid不会重复
* type在几个地方都有，他们表述的都是同一个内容：0指聊天室；1指失物招领；2指寻物启事
* 由于不可描述的原因，我返回的json里面可能有些地方文档里写的是int但是实际返回的是string，如发现联系我修改


# 注册

用户注册
请求: POST, url: scut18pie1.top/test/gift/user/register.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户的id，长度20以下，只能使用英文数字下划线组合 |
| nickname | string | 用户的昵称，长度30以下，只能使用英文数字中文下划线组合 |
| password | string | 用户登录使用的口令，会经过md5加密后保存在服务器 |
| sex | int | 0=>男；1=>女 |
| adress | string | 不超过100个字符 |
| phone | string | 不超过20个数字 |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若注册成功，返回1；若不成功，原因是id冲突则返回0|

# 登录

用户登录
请求: POST, url: scut18pie1.top/test/gift/user/login.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户的id，长度20以下，只能使用英文数字下划线组合 |
| password | string | 用户登录使用的口令 |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若登录成功，返回1；否则返回0 |

**登录成功后服务器会通过session保存登录状态**

# 更新个人信息

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/update_my_info.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| params | array | 键 |
| values | array | 值 |

params格式: 

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | string | 'adress', 'phone', 'selfIntro', 'sex', 'nickname'五个任选一个以上 |

values格式: 

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | string | 值的顺序要与params一一对应 |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若修改成功，返回0以上的数字；否则返回0 |


# 修改头像

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/update_headPic.php, 数据格式: data

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| headPic | jpg/png | 头像的图片，注意做出上传大小限制 |


# 获取用户信息(自身)

**在登录之后，**通过这个页面获得用户的基本信息。    

url: scut18pie1.top/test/gift/user/get_my_info.php    

返回数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若没有登录，返回0，并且没有info一项；否则返回1 |
| info | array | 用户个人信息 |

info格式:

| 键 | 值 |
| --- | --- |
| uid | int |
| id | string |
| nickname | string |
| sex | int |
| adress | string |
| headPic | string/null |
| phone | string |
| selfIntro | string/null |

# 获取用户信息


url: scut18pie1.top/test/gift/user/get_user_info.php    

请求数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id，记得先检查合不合法 |

返回数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若没有登录，返回0，并且没有info一项；否则返回1 |
| info | array | 用户个人信息 |

info格式:

| 键 | 值 |
| --- | --- |
| uid | int |
| id | string |
| nickname | string |
| sex | int |
| adress | string |
| headPic | string/null |
| phone | string |
| selfIntro | string/null |


# 检查id是否重复

请求: POST, url: scut18pie1.top/test/gift/user/check_id_existence.php    

请求数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id，记得先检查合不合法 |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若id已经存在，返回1；否则返回0 |


# 获取失物招领和寻物启事列表

请求: POST, url: scut18pie1.top/test/gift/user/get_event_list.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| start | int | 第一条是0，第二条是1，…… |
| step | int | 指start开始数起的多少条 |

返回数据格式: JSON

纯数字列表，代表eid

array格式:

| 键 | 值 |
| --- | --- |
| - | int，指eid |


# 搜索失物招领和寻物启事

请求: POST, url: scut18pie1.top/test/gift/user/search_event.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| content | string | 搜索内容 |

返回数据格式: JSON

纯数字array，代表eid

array格式:

| 键 | 值 |
| --- | --- |
| - | int，指eid |


# 发起失物招领

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/post_a_found.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id |
| content | string | 失物招领的详细信息 |
| phone | string | 发起人手机 |
| adress | string | 交货地址 |
| - | jpg/png | 附带的图片 |

图片可以是复数


返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若发布成功，返回eid, 否则返回0 |


# 发起寻物启事

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/post_a_lost.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id |
| content | string | 寻物的详细信息 |
| phone | string | 收货人手机 |
| adress | string | 收货地址 |
| - | jpg/png | 附带的图片 |

图片可以是复数

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若发布成功，返回eid, 否则返回0 |

# 删除失物招领或者寻物启事

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/drop_an_event.php, 数据格式: JSON

发布者本人才能进行该操作

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事id |
| rid | int | 评论区id |

# 获取失物招领或者寻物启事详细信息

请求: POST, url: scut18pie1.top/test/gift/user/get_event_info.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事id |

返回数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事id |
| type | int | 1，失物招领；2，寻物启事 |
| rid | int | 注册该事件时获得的评论区房间号 |
| id | string | 发起用户id |
| content | string | 内容描述 |
| phone | string | 电话 |
| adress | string | 交货地址 |
| createTime | string | 时间戳，**请前端自行不上两个0** |
| clicks | int | 点击量 |
| goods | int | 点赞量 |

# 增加点击数

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/click.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事的id |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若发布成功，返回1；若不成功，返回0 |

# 点赞

**本接口需要登录后使用**

请求一次，用户就在点赞或者没点赞的状态之间切换一次。

请求: POST, url: scut18pie1.top/test/gift/user/good.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事的id |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若发布成功，返回1；若不成功，返回0 |

# 获取某事件是否被点赞

**本接口需要登录后使用**


请求: POST, url: scut18pie1.top/test/gift/user/check_good_existence.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| eid | int | 失物招领或者寻物启事的id |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 点赞了，返回1；否则，返回0 |

# 发布评论、post聊天信息

**本接口需要登录后使用**

请求: POST, url: scut18pie1.top/test/gift/user/post_a_chat.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| rid | int | 房间号 |
| content | string | 聊天文本 |

返回数据格式: TEXT

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | int | 若发布成功，返回1；若不成功，返回0 |

# 获取评论、获取聊天记录

**本接口需要登录后使用，获取聊天记录需要用户本身在聊天室内才能进行**

请求: POST, url: scut18pie1.top/test/gift/user/pull_chats.php, 数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| rid | int | 房间号 |

请求数据格式: JSON

| 键名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| - | array | 记录集 |

array格式:

| 键 | 值 |
| --- | --- |
| id | string，用户id |
| content | string | 内容 |
| createTime | string? | 该记录的时间戳，**前端自行补上两个0吧** |
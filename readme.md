# 注册

用户注册
请求: POST, url: scut18pie1.top/test/gift/user/response_register.php, 数据格式: JSON

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户的id，长度20以下，只能使用英文数字下划线组合 |
| nickname | string | 用户的昵称，长度30以下，只能使用英文数字中文下划线组合 |
| password | string | 用户登录使用的口令，会经过md5加密后保存在服务器 |
| sex | int | 0=>男；1=>女 |
| adress | string | 不超过100个字符 |
| phone | string | 不超过20个数字 |

返回数据格式: TEXT

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若注册成功，返回1；若不成功，原因是id冲突则返回0|

# 登录

用户登录
请求: POST, url: scut18pie1.top/test/gift/user/response_login.php, 数据格式: JSON

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户的id，长度20以下，只能使用英文数字下划线组合 |
| password | string | 用户登录使用的口令 |

返回数据格式: TEXT

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若登录成功，返回1；否则返回0|

**登录成功后服务器会通过session保存登录状态**

# 获取用户信息

**在登录之后，**通过这个页面获得用户的基本信息。    
url: scut18pie1.top/test/gift/user/get_user_info.php    
返回数据格式: JSON

| 变量名 | 数据类型 | 描述 |
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

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id，记得先检查合不合法 |

返回数据格式: TEXT

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若id已经存在，返回1；否则返回0 |


# 获取失物招领信息（卫星）

请求: POST, url: scut18pie1.top/gift/method/lost.php, 数据格式: JSON

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 固定为1，其他请求一律无视 |

返回数据格式: JSON

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若没有失物招领，返回0；否则返回1 |
| info | array | 失物招领信息，若status为0则为**空数组** |

array格式:

| 键 | 值 |
| --- | --- |
| string，用户昵称 | string，失物招领相关信息 |


# 发起失物招领（卫星）

请求: POST, url: scut18pie1.top/gift/method/lost.php, 数据格式: JSON

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| id | string | 用户id |
| info | string | 失物招领的详细信息 |

返回数据格式: TEXT

| 变量名 | 数据类型 | 描述 |
| ------ | --------- | ----- |
| status | int | 若发布成功，返回0；若不成功，返回1 |
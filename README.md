# I Don't Eat Alone (IDEA)
😃 성균관대 혼밥러들을 위한 상호 매칭 서비스 🌮🍜 

Matchig service for student who eat alone in SKKU 👭

___
**목차 (Contents)**
1. [IDEA에 대하여 (About IDEA)](## 1.-IDEA에 대하여-(About-IDEA))
2. [시스템 구조 및 알고리즘 소개 (System Structure & Algorithm)](## 2.-시스템-구조-및-알고리즘-(System-Structure-&-Algorithm))
3. [실행 방법 및 소스 코드 구조 (Execution & Code Structure)](## 3.-실행-방법-및-소스-코드-구조-(Execution-&-Code Structure))
4. [개발자 소개 (Developer Introduction)](## 4.-개발자-소개-(Developer-Introduction))
___

## 1. IDEA에 대하여 (About IDEA)
[🍬IDEA(I Don't Eat Alone)](http://nohonbab.tk)

- IDEA는 원하는 시간과 장소에서 같이 식사할 사람을 나이, MBTI, 선호 성별, 좋아하는 음식 등에 기반하여 서로 매칭해주는 서비스입니다! 🤗🍴
- 현재는 성균관대학교 인문사회과학캠퍼스를 대상으로 운영중이며, 추후에 다른 대학교까지 확장할 계획입니다!

**💻서비스 접속 URL: http://nohonbab.tk**

주의사항) https 접속시 기능이 정상적으로 작동하지 않습니다. http 으로 접속 부탁드려요..🙂

![Screen Shot 2022-05-23 at 2 10 07 AM](https://user-images.githubusercontent.com/80497842/169707177-aa5ee763-ea48-4e71-9d48-6b1e390c6268.png)

**기능1. 새로 매칭 (정보 등록)**
- 사용자는 식사를 하고 싶은 시간, 장소와 함께 본인의 나이, 성별, MBTI 등을 입력하여 '친구 찾기' 등록을 합니다.

**기능2. 매칭 조회**
- 사용자 정보를 등록했다면, 언제든 등록한 이름을 통해 매칭 상태를 확인할 수 있습니다. 
- 매칭이 되었다면, 상대 정보를 보여줍니다. 카카오톡 ID를 통해 연락을 주고받으시면 됩니다:)

**기능3. 매칭 취소**
- 이름을 이용하여 매칭 취소를 하면, 입력했던 데이터가 시스템에서 안전하게 삭제됩니다.

IDEA와 함께 새로운 친구를 만들어봐요..! 😍
___

## 2. 시스템 구조 및 알고리즘 (System Structure & Algorithm)

**배포 현황 소개**

<img width="669" alt="Screen Shot 2022-05-23 at 2 16 29 AM" src="https://user-images.githubusercontent.com/80497842/169707388-66309e9a-68c8-4baa-aefc-34c43c97422c.png">

- 서버는 node.js 기반의 어플리케이션입니다.
- 프론트엔드의 요청을 처리하는 '서버1'과, 주기적으로 매칭 알고리즘을 실행하는 '서버2'로 구성됩니다.
- docker 컨테이너 환경에서 개발 및 배포 하였으므로, 이식성이 뛰어난 서비스입니다. (실행 방법은 3단원을 참고해주세요)
- 현재 백엔드 서비스는 AWS ECS를 통해 배포된 상태입니다.

**매칭 알고리즘 소개**

<img width="842" alt="Screen Shot 2022-05-23 at 2 25 17 AM" src="https://user-images.githubusercontent.com/80497842/169707703-f46fad1d-5d7f-4ce8-b6e8-a3905e59efec.png">

___

## 3. 실행 방법 및 소스 코드 구조 (Execution & Code Structure)

**local환경에서 백엔드 실행 (Executing server in local environment)**
1. `git clone` 명령어를 통해 로컬 디렉토리로 소스 코드를 가져옵니다. (Copy the code to your local directory by using `git clone`)
2. Docker를 설치합니다 (Install Docker)
3. 원격 또는 내부 데이터베이스를 구축합니다. 
4. clone한 디렉토리 내부에 envs 폴더를 생성한 후, backend.env와 matcher.env에 구축한 데이터베이스에 접근하는 url, port, username, password등을 다음과 같은 형식으로 기재합니다.
```
PORT=(port number)
DB_USER_NAME=(database account user name)
DB_PASSWORD=(password of database account)
DB_URL=(address of database system)
DB_PORT=(port number)
DB_DATABASE_NAME=(database schema name)
NODE_ENV=dev
```
5. clone한 디렉토리 내부에서 `docker-compose up --build` 명령어를 실행합니다.

😉Completed!


___
## 4. 개발자 소개 (Developer Introduction)

최재열 
- 성균관대학교 컴퓨터교육과 18학번
- 시스템 설계, 백엔드 및 알고리즘 개발
- [Github](github.com/jaeyeol816)  

김연준  
- 성균관대학교 컴퓨터교육과 18학번
- 알고리즘 개발 및 시스템 디자인
- [Github](github.com/qqweqwqweqwe)

김택호  
- 성균관대학교 컴퓨터교육과 18학번
- 프론트엔드 I/O처리 및 통신 부분 담당
- [Github](github.com/TaekHoKIM)

한우석  
- 성균관대학교 컴퓨터교육과 21학번
- 프론트엔드 통신 및 구조 담당
- [Github](github.com/asktopol)  

<img width="765" alt="Screen Shot 2022-05-23 at 2 40 21 AM" src="https://user-images.githubusercontent.com/80497842/169708303-28b4af6e-1744-4750-b828-4ae0902285ff.png">

/*
 3. 자바스크립트의 객체
    오브젝트를 생성하는 세가지 방법에 대해 공부하고 각각에 대한 예시 코드를 작성해주세요.

    도전 과제 1. 타입스크립트로 구현해보세요.
    도전 과제 2. jest 로 단위 테스트 코드를 작성해보세요.
*/
// 1) 객체 리터럴
var obj1 = {
    name: "홍길동",
    age: 20,
};
console.log(typeof obj1); // object
console.log(obj1); // {name : "홍길동", age : 20}
// 2) 생성자 함수
// 2-1) Object 생성자 함수
var obj2 = new Object();
obj2.name = "홍길동";
obj2.age = 20;
console.log(typeof obj2); // object
console.log(obj2); // {name : "홍길동", age : 20}
// 2-2) 생성자 함수
function Person1(name, age) {
    // 인스턴스 초기화
    // (1)빈 객체(인스턴스 생성)가 this에 바인딩
    // (2)this에 바인딩 되어있는 인스턴스 초기화
    this.name = name;
    this.age = age;
    // (3) 함수 내부 처리 완료 시 인스턴스 바인딩 된 this 암묵적으로 반환
    // 명시적으로 return 시 this 반환 X
}
// 인스턴스 생성
var obj3 = new Person1("홍길동", 20);
console.log(typeof obj3); // object
console.log(obj3); // Person1 { name: '홍길동', age: 20 }
// 3) 클래스
var Person2 = /** @class */ (function () {
    function Person2(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person2;
}());
var obj4 = new Person2("홍길동", 20);
console.log(typeof obj4); // object
console.log(obj4); // Person2 { name: '홍길동', age: 20 }

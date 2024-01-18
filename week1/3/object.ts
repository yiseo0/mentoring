/*
 3. 자바스크립트의 객체
    오브젝트를 생성하는 세가지 방법에 대해 공부하고 각각에 대한 예시 코드를 작성해주세요.

    도전 과제 1. 타입스크립트로 구현해보세요.
    도전 과제 2. jest 로 단위 테스트 코드를 작성해보세요.
*/

/*
 자바스크립트의 객체 생성 방법
 1) 객체 리터럴
    - 리터럴 : 사람이 이해할 수 있는 문자 또는 기호로 값을 생성하는 방법
    - {} 중괄호 사용

2) 생성자 함수
    2-1) Object 생성자 함수
    - new 연산자와 함께 Object 생성자 함수 호출
    빈 객체를 생성한 이후 프로퍼티, 메서드 추가
    - 생성자 함수로 만들어진 객체를 인스턴스라고 함

    2-2) 생성자 함수
     - 똑같은 객체를 여러 개 간편하게 생성 가능
     * 화살표 함수로 만들면 this 바인딩 달라서 함수 선언문 사용
        화살표 함수 : 외부 스코프 this 사용

3) 클래스(ES6)
    - constructor 내부에 프로퍼티 정의 필요
*/

interface IObject {
  name: string;
  age: number;
}

// 1) 객체 리터럴
const obj1: IObject = {
  name: "홍길동",
  age: 20,
};
console.log(typeof obj1); // object
console.log(obj1); // {name : "홍길동", age : 20}

// 2) 생성자 함수
// 2-1) Object 생성자 함수
const obj2: any = new Object();
obj2.name = "홍길동";
obj2.age = 20;
console.log(typeof obj2); // object
console.log(obj2); // {name : "홍길동", age : 20}

// 2-2) 생성자 함수
function Person1(name: string, age: number) {
  // 인스턴스 초기화
  // (1)빈 객체(인스턴스 생성)가 this에 바인딩

  // (2)this에 바인딩 되어있는 인스턴스 초기화
  this.name = name;
  this.age = age;

  // (3) 함수 내부 처리 완료 시 인스턴스 바인딩 된 this 암묵적으로 반환
  // 명시적으로 return 시 this 반환 X
}
// 인스턴스 생성
const obj3 = new Person1("홍길동", 20);
console.log(typeof obj3); // object
console.log(obj3); // Person1 { name: '홍길동', age: 20 }

// 3) 클래스
class Person2 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const obj4 = new Person2("홍길동", 20);
console.log(typeof obj4); // object
console.log(obj4); // Person2 { name: '홍길동', age: 20 }

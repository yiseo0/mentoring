describe("객체 생성 테스트", () => {
  it("1) 객체 리터럴", () => {
    const obj1: IObject = {
      name: "홍길동",
      age: 20,
    };
    expect(typeof obj1).toBe("object");
  });

  it("2-1)  Object 생성자 함수", () => {
    const obj2: any = new Object();
    obj2.name = "홍길동";
    obj2.age = 20;
    expect(typeof obj2).toBe("object");
  });

  it("2-2) 생성자 함수", () => {
    function Person1(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    const obj3 = new Person1("홍길동", 20);
    expect(typeof obj3).toBe("object");
  });

  it("3) 클래스", () => {
    class Person2 {
      name: string;
      age: number;

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
    const obj4 = new Person2("홍길동", 20);
    expect(typeof obj4).toBe("object");
  });
});

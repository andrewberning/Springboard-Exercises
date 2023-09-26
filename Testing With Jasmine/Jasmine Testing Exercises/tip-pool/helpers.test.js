describe("Helpers test(with setup and tear-down", function () {
  beforeEach(function () {
    billAmtInput.value = "10";
    tipAmtInput.value = "10";
    submitPaymentInfo();
  });

  it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
    expect(sumPaymentTotal("tipAmt")).toEqual(10);

    billAmtInput.value = "100";
    tipAmtInput.value = "10";
    submitPaymentInfo();

    expect(sumPaymentTotal("tipAmt")).toEqual(20);
  });

  it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
    expect(sumPaymentTotal("billAmt")).toEqual(10);

    billAmtInput.value = "100";
    tipAmtInput.value = "10";
    submitPaymentInfo();

    expect(sumPaymentTotal("billAmt")).toEqual(110);
  });

  it('should sum total tip percent on sumPaymentTotal()', function () {
    expect(sumPaymentTotal("tipPercent")).toEqual(100);

    billAmtInput.value = "100";
    tipAmtInput.value = "10";
    submitPaymentInfo();

    expect(sumPaymentTotal("tipPercent")).toEqual(110);
  });

  it('should sum tip percent of a single tip on calculateTipPercent()', function () {
    expect(calculateTipPercent(100, 20)).toEqual(20);
    expect(calculateTipPercent(50, 20)).toEqual(40);
  });

  it("should create new td from value and append it to tr on appendTd(tr, value)", function () {
    let newTr = document.createElement('tr');

    appendTd(newTr, "test");

    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("test");
  });

  it("should create a delete td and append it to tr on appendDeleteBtn(tr, type)", function () {
    let newTr = document.createElement('tr');

    appendTd(newTr, "test remove");

    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("test remove")
  });

  afterEach(function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
    paymentId = 0;
    allPayments = {};
  });

});
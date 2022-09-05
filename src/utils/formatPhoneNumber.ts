const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.split('').map((el, i) => {
    switch (i) {
      case 0:
        return `(${el}`;
      case phoneNumber.length < 10 ? 1 : 2 :
        return `${el}${phoneNumber[i + 1] ? ') ' : ''}`;
      case phoneNumber.length < 10 ? 4 : 5:
        return `${el}${phoneNumber[i + 1] ? '-' : ''}`;
      default:
        return el;
    }
  }).join('');
};

export default formatPhoneNumber;

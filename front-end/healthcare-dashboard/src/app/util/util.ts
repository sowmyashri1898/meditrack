import { MessageService } from "primeng/api";


export class ArtifactUtils {

  public static AVATARBOY = "assets/demo/images/avatar/boyAvtar.jpg";

  public static AVATARGIRL = "assets/demo/images/avatar/girlAvtar.jpg";
  // 1;
  public static daysObj = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };
  public static weekdayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  constructor() {}

  public static convertGMTDate(gmtDate: string) {
    var date = new Date(gmtDate),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  public static isNull(value: any): boolean {
    if (value == null) {
      return true;
    } else if (value === "") {
      return true;
    } else if (value === "null") {
      return true;
    } else if (value === "NULL") {
      return true;
    } else if (value === "undefined") {
      return true;
    } else if (value === 0) {
      return true;
    } else {
      return false;
    }
  }

  public static getValue(value: any): any {
    if (value == null) {
      return "";
    } else if (value === "") {
      return "";
    } else if (value === "null") {
      return "";
    } else if (value === "NULL") {
      return "";
    } else if (value === "undefined") {
      return "";
    } else if (value === 0) {
      return "";
    } else {
      return value;
    }
  }

  public static showErrorViaToast(
    service: MessageService,
    message: string
  ): void {
    service.add({
      key: "tst",
      severity: "error",
      summary: "Error Message",
      detail: message,
    });
  }

  public static showInfoViaToast(
    service: MessageService,
    message: string
  ): void {
    service.add({
      key: "tst",
      severity: "info",
      summary: "Info Message",
      detail: message,
    });
  }

  public static showWarnViaToast(
    service: MessageService,
    message: string,
    toastKey?: string
  ): void {
    if (this.isNull(toastKey)) {
      toastKey = "tst";
    }
    service.add({
      key: toastKey,
      severity: "warn",
      summary: "Warning Message",
      detail: message,
    });
  }

  public static showSuccessViaToast(
    service: MessageService,
    message: string
  ): void {
    service.add({
      key: "tst",
      severity: "success",
      summary: "Success Message",
      detail: message,
    });
  }

  // public static getEpochDateTime(input: Date): number {
  //   const epochNow = input?.getTime();
  //   return epochNow;
  // }
  public static getEpochDateTime(
    input: Date | null | undefined
  ): number | null {
    if (input instanceof Date) {
      return input.getTime();
    } else {
      return null;
    }
  }

  public static getDOB(dob: Date): boolean {
    if (dob === null) {
      return false;
    }
    let isDOB = false;
    if (
      dob.getDate() === new Date().getDate() &&
      dob.getMonth() === new Date().getMonth()
    ) {
      isDOB = true;
    }
    return isDOB;
  }


  public static numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 31 && (charCode < 46 || charCode > 57)) ||
      charCode === 47
    ) {
      return false;
    }
    return true;
  }
  public static restrictZero(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;

    if (
      event.target.value.length === 0 &&
      (event.which === 48 || event.which === 46)
    ) {
      return false;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    return true;
  }



  public static isFieldAlreadyExists(
    fieldName: any,
    fieldValue: any,
    listToCheck: any[]
  ): boolean {
    let isExists = false;
    listToCheck.forEach((item, index) => {
      if (item[fieldName] === fieldValue) {
        isExists = true;
      }
    });
    return isExists;
  }

  public static isFieldAlreadyExistsIgnoreCase(
    fieldName: any,
    fieldValue: any,
    listToCheck: any[]
  ): boolean {
    let isExists = false;
    listToCheck.forEach((item, index) => {
      if (item[fieldName].toLowerCase() === fieldValue.toLowerCase()) {
        isExists = true;
      }
    });
    return isExists;
  }



  public static expoExcel(data: any): void {
    // const file = new Blob([data], { type: 'application/vnd.ms-excel' });
    const file = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, "blank");
  }



  public static getCapitalize(value: string): string {
    if (this.isNull(value)) {
      return "";
    }
    const str = value;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  }

  public static getRecordedDetails(date1: Date, date2: Date): string {
    const days = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

    const hours =
      (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60)) % 24;
    const minutes =
      (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60)) % 60;
    const seconds = (Math.abs(date2.getTime() - date1.getTime()) / 1000) % 60;

    if (days > 1) {
      return Math.floor(days) + " days ago";
    } else if (hours > 1) {
      return Math.floor(hours) + " hours ago";
    } else if (minutes > 1) {
      return Math.floor(minutes) + " minutes ago";
    } else {
      return Math.floor(seconds) + " seconds ago";
    }
  }



  public static getSyncFusionDate(date: Date): string {
    let exceptionString = "";
    if (date != null) {
      if (!this.isNull(new Date(date).getFullYear())) {
        exceptionString = new Date(date).getFullYear().toString();
      }

      if (!this.isNull(new Date(date).getMonth() + 1)) {
        const month: number = new Date(date).getMonth() + 1;
        if (month.toString().length === 1) {
          exceptionString =
            exceptionString + "0" + (new Date(date).getMonth() + 1);
        } else {
          exceptionString = exceptionString + (new Date(date).getMonth() + 1);
        }
      }
      if (!this.isNull(new Date(date).getDate())) {
        const month: string = new Date(date).getDate().toString();
        if (month.length === 1) {
          exceptionString = exceptionString + "0" + new Date(date).getDate();
        } else {
          exceptionString = exceptionString + new Date(date).getDate();
        }
      }
      exceptionString = exceptionString + "T182959Z";
      // exceptionString = exceptionString + "T000001Z";
      // if (!this.isNull(new Date(date).getHours())) {
      //   const month: string = new Date(date).getHours().toString();
      //   if (month.length === 1) {
      //     exceptionString = exceptionString + "T0" + new Date(date).getHours();
      //   } else {
      //     exceptionString = exceptionString + "T" + new Date(date).getHours();
      //   }
      // } else {
      //   exceptionString = exceptionString + "T23";
      // }
      // if (!this.isNull(new Date(date).getMinutes())) {
      //   const month: string = new Date(date).getMinutes().toString();
      //   if (month.length === 1) {
      //     exceptionString = exceptionString + "0" + new Date(date).getMinutes();
      //   } else {
      //     exceptionString = exceptionString + new Date(date).getMinutes();
      //   }
      // } else {
      //   exceptionString = exceptionString + "59";
      // }
      // if (!this.isNull(new Date(date).getSeconds())) {
      //   const month: string = new Date(date).getSeconds().toString();
      //   if (month.length === 1) {
      //     exceptionString =
      //       exceptionString + "0" + new Date(date).getSeconds() + "Z";
      //   } else {
      //     exceptionString = exceptionString + new Date(date).getSeconds() + "Z";
      //   }
      // } else {
      //   exceptionString = exceptionString + "59Z";
      // }
    }
    return exceptionString;
  }

 






  public static getGeneralSettingMPIValue(
    data: any[],
    identiFier: any
  ): string {
    let name = "";
    if (data.length > 0) {
      data.forEach((element) => {
        if (element.eventIdentifier === identiFier) {
          if (element?.generalSettings?.displayExternalMPI) {
            name = "Patient Name/MRN";
          } else {
            name = "Patient Name/MPI";
          }
        }
      });
    }
    return name;
  }

  public static getDateDifferenceInDays(date1: Date, date2: Date): any {
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (24 * 60 * 60 * 1000)
    );
    return differenceInDays;
  }

  public static getEpochDateDifferenceInDays(
    date1: number,
    date2: number
  ): any {
    const differenceInMilliseconds = date2 - date1;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (24 * 60 * 60 * 1000)
    );
    return differenceInDays;
  }

  public static addMinutes(date: Date, minutes: number) {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + minutes);

    return newDate;
  }

  public static getTimeLeftDetails(date1: Date, date2: Date): string {
    if (date2.getTime() < date1.getTime()) {
      return "";
    }
    const days = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

    const hours =
      (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60)) % 24;
    const minutes =
      (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60)) % 60;
    const seconds = (Math.abs(date2.getTime() - date1.getTime()) / 1000) % 60;

    if (days > 1) {
      return Math.floor(days) + " days left";
    } else if (hours > 1) {
      return Math.floor(hours) + " hours left";
    } else if (minutes > 1) {
      return Math.floor(minutes) + " minutes left";
    } else {
      return Math.floor(seconds) + " seconds left";
    }
  }







  public static getRecurrenceException(recDate: Date): string {
    let exception = "";
    let month = recDate.getMonth() + 1;
    exception =
      recDate.getFullYear() +
      "" +
      (month > 9 ? month : "0" + month) +
      "" +
      (recDate.getDate() > 9
        ? recDate.getDate()
        : "0" +
          recDate.getDate() +
          "T" +
          (recDate.getHours() > 9
            ? recDate.getHours()
            : "0" + recDate.getHours()) +
          "" +
          (recDate.getMinutes() > 9
            ? recDate.getMinutes()
            : "0" + recDate.getMinutes()) +
          "00Z");
    return exception;
  }

  public static isDark(color: string): boolean {
    // Convert hex to RGB
    const rgb = ArtifactUtils.hexToRgb(color);

    // Calculate relative luminance
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

    // Check if the color is dark
    return luminance < 128;
  }

  public static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
}

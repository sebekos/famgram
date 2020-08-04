const unixTime = (time) => {
    const date = new Date(time);
    const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" });
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
    return `${month} ${day}, ${year}`;
};

export default unixTime;

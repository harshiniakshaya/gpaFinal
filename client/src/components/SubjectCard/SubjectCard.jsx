import SelectBox from "../SelectBox/SelectBox";

const SubjectCard = ({ sno, sname, sgrades, scode, scredit, onGradeChange }) => {
    const grades = [
        {
            key: 10,
            value: 'O'
        },
        {
            key: 9,
            value: 'A+'
        },
        {
            key: 8,
            value: 'A'
        },
        {
            key: 7,
            value: 'B+'
        },
        {
            key: 6,
            value: 'B'
        },
        {
            key: 5,
            value: 'C+'
        },
        {
            key: 4,
            value: 'C'
        },
        {
            key: 0,
            value: 'FAIL'
        },
    ]
    return (
        <div className="bg-base-200 collapse my-1 rounded-md">
            <div className="bg-slate-950 text-slate-100 flex flex-col justify-between items-center">
                <div className="flex flex-row justify-between items-center w-full p-2">
                    <div className="sno p-3 text-xs">{sno}</div>
                    <div className="w-[100%]">
                        <div className="subject-name font-semibold">{sname}</div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="sub-code text-sm font-thin">{scode}</div>
                            <div className="sub-credit text-sm font-thin">{scredit}</div>
                        </div>
                    </div>
                </div>
                <div className="grade-selection my-1">
                    <SelectBox label={''} name={'grade'} onChange={onGradeChange} options={grades} />
                </div>
            </div>
        </div>
    );
};

export default SubjectCard;

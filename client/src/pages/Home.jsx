import React, { useState } from 'react'
import axios from 'axios'
import NavbarTop from '../components/NavbarTop/NavbarTop';
import SelectBox from '../components/SelectBox/SelectBox';
import SubjectCard from '../components/SubjectCard/SubjectCard';

const Home = () => {
    
    const regulations = [
        {
            key: 2019,
            value: 2019
        },
        {
            key: 2023,
            value: 2023
        }
    ]

    const departments = [
        { key: "aero", value: "AERONAUTICAL ENGINEERING" },
        { key: "aids", value: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE" },
        { key: "aiml", value: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING" },
        { key: "auto", value: "AUTOMOBILE ENGINEERING" },
        { key: "bme", value: "BIOMEDICAL ENGINEERING" },
        { key: "biotech", value: "BIOTECHNOLOGY" },
        { key: "chem", value: "CHEMICAL ENGINEERING" },
        { key: "civil", value: "CIVIL ENGINEERING" },
        { key: "csd", value: "COMPUTER SCIENCE AND DESIGN" },
        { key: "cse", value: "COMPUTER SCIENCE AND ENGINEERING" },
        { key: "csecs", value: "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)" },
        { key: "csbs", value: "COMPUTER SCIENCE AND BUSINESS SYSTEMS" },
        { key: "eee", value: "ELECTRICAL AND ELECTRONICS ENGINEERING" },
        { key: "ece", value: "ELECTRONICS AND COMMUNICATION ENGINEERING" },
        { key: "ft", value: "FOOD TECHNOLOGY" },
        { key: "it", value: "INFORMATION TECHNOLOGY" },
        { key: "mech", value: "MECHANICAL ENGINEERING" },
        { key: "mct", value: "MECHATRONICS" },
        { key: "ra", value: "ROBOTICS AND AUTOMATION" }
    ]

    const semesters = [
        {
            key: 1,
            value: 1
        },
        {
            key: 2,
            value: 2
        },
        {
            key: 3,
            value: 3
        },
        {
            key: 4,
            value: 4
        },
        {
            key: 5,
            value: 5
        },
        {
            key: 6,
            value: 6
        },
        {
            key: 7,
            value: 7
        },
        {
            key: 8,
            value: 8
        }
    ]

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

    const [subjects,setSubjects] = useState([])
    const [optionsSelected, setOptionsSelected] = useState(
        {
            regulation: '',
            dept: '',
            sem: ''
        }
    )
    const [selectedGrades, setSelectedGrades] = useState({});

    const handleGradeChange = (sno) => (e) => {
        const grade = e.target.value;
        setSelectedGrades(prev => ({
            ...prev,
            [sno]: grade
        }));
    };

    const onOptionsSelected = (e) => {
        let key = e.target.name === 'regulation'? regulations[e.target.selectedIndex - 1]: e.target.name === 'dept'? departments[e.target.selectedIndex - 1]: semesters[e.target.selectedIndex - 1];
        console.log(key);
        setOptionsSelected(prev => {
            return {
                ...prev,
                [e.target.name]: key.key + ''
            }
        })
    } 
    
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (optionsSelected.dept.trim() === '' || optionsSelected.regulation.trim() === '' || optionsSelected.sem.trim() === '') {
            alert('Missing required field!');
            return;
        }

        const collectionName = ('UG' + optionsSelected.regulation + optionsSelected.dept).toUpperCase();
        const semester = optionsSelected.sem;

        try {
            const result = await axios.post("https://gpacalc-zeta.vercel.app/", { collectionName, semester });
            setSubjects(result.data[0].subjects);
        } catch (error) {
            setSubjects([]);
            console.error(error);
        }
    };

    const calculateGPA = (e) => {
        e.preventDefault();
        const creditsArray = [];
        const gradesArray = [];
        
        subjects.forEach(subject => {
            const credits = Number(subject.credit);
            const grade = Number(selectedGrades[subject.sno] || 0);
            creditsArray.push(credits);
            gradesArray.push(grade);
        });

        let csum = 0;
        let tsum = 0;
        creditsArray.forEach((credit, index) => {
            csum += credit;
            tsum += credit * grades[index].key;
            console.log(grades[index].value + ' - ' + index);
            // console.log(index);
        });
        console.log(tsum);
        console.log(csum);
        const gpa = (tsum / csum).toFixed(2);
        alert(`Calculated GPA: ${gpa}`);
    };

  return (
    <>
        <NavbarTop />
        <div className='home bg-base-300 min-h-[100vh] flex flex-col justify-between items-center'>
            <div className="alert alert-info my-3 mx-auto max-w-[300px] flex justify-center items-center">
                <span className='text-center'>
                    Designed for the students of Rajalakshmi Engineering College
                </span>
            </div>

            <div className="options-container flex flex-col justify-center items-center">
                <SelectBox name={'regulation'} onChange={onOptionsSelected} options={regulations} label={'Choose your regulation'}/>
                <SelectBox name={'dept'} onChange={onOptionsSelected} options={departments} label={'Choose your department'}/>
                <SelectBox name={'sem'} onChange={onOptionsSelected} options={semesters} label={'Choose your semester'}/>
                <div className="btn btn-primary my-3" onClick={handleSubmit}>Submit</div>
            </div>
            {/* <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center py-6'>
                <div className='max-w-full sm:max-w-md md:max-w-full overflow-scroll'>
                    <table className='border border-gray-200'>
                        <tbody>
                            <tr>
                                <th className='py-2 px-4 text-left'><label htmlFor='regulation'>REGULATION</label></th>
                                <td className='py-2 px-4'>
                                    <select id='regulation' name='regulation'>
                                        <option>2019</option>
                                        <option>2023</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th className='py-2 px-4 text-left'><label htmlFor='dept'>DEPARTMENT</label></th>
                                <td className='py-2 px-4'>
                                    <select id="dept" name="dept">
                                        <option value="aero">AERONAUTICAL ENGINEERING</option>
                                        <option value="aids">ARTIFICIAL INTELLIGENCE AND DATA SCIENCE</option>
                                        <option value="aiml">ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</option>
                                        <option value="auto">AUTOMOBILE ENGINEERING</option>
                                        <option value="bme">BIOMEDICAL ENGINEERING</option>
                                        <option value="biotech">BIOTECHNOLOGY</option>
                                        <option value="chem">CHEMICAL ENGINEERING</option>
                                        <option value="civil">CIVIL ENGINEERING</option>
                                        <option value="csd">COMPUTER SCIENCE AND DESIGN</option>
                                        <option value="cse">COMPUTER SCIENCE AND ENGINEERING</option>
                                        <option value="csecs">COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)</option>
                                        <option value="csbs">COMPUTER SCIENCE AND BUSINESS SYSTEMS</option>
                                        <option value="eee">ELECTRICAL AND ELECTRONICS ENGINEERING</option>
                                        <option value="ece">ELECTRONICS AND COMMUNICATION ENGINEERING</option>
                                        <option value="ft">FOOD TECHNOLOGY</option>
                                        <option value="it">INFORMATION TECHNOLOGY</option>
                                        <option value="mech">MECHANICAL ENGINEERING</option>
                                        <option value="mct">MECHATRONICS</option>
                                        <option value="ra">ROBOTICS AND AUTOMATION</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th className='py-2 px-4 text-left'><label htmlFor='sem'>SEMESTER</label></th>
                                <td className='py-2 px-4'>
                                    <select id='sem' name='sem'>
                                        {
                                            [1,2,3,4,5,6,7,8].map(sem=>(
                                                <option key={sem} value={sem}>{sem}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className='btn px-3 py-2 rounded-md mt-3'>SELECT</button>
            </form> */}
                {subjects.length > 0 ? (
                    <form onSubmit={calculateGPA} className='flex flex-col justify-center items-center'>
                        {subjects.map((subject) => (
                            <SubjectCard
                                key={subject._id}
                                sno={subject.sno || 0}
                                scode={subject.subcode || 0}
                                sname={subject.sub || 0}
                                scredit={subject.credit || 0}
                                sgrades={selectedGrades[subject.sno] || 0}
                                onGradeChange={handleGradeChange(subject.sno)}
                            />
                        ))}
                        <button className='btn btn-primary my-2'>CALCULATE GPA</button>
                    </form>
                ) : (
                    <h2 className='text-center'>No data available</h2>
                )}
        </div>
    </>
  )
}

export default Home
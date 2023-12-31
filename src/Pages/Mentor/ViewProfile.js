import React,{useState} from 'react';
import { authFetch } from '../../Middleware/axios/Interceptors';
import { ToastError } from '../../features/DisplayMessage';
import { useParams } from 'react-router-dom';
import { createImageFromInitials, getRandomColor } from '../../features/ImageGenerate';
import { Breathing } from 'react-shimmer';


const ViewProfile = () => {
    const {id} = useParams()
    const [profileData,setProfileData]=useState()

    const ProfileSubmit =async()=> {
        try {
        const res = await authFetch(`/mentor/${id}`);
        const profileData = res.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
        }, {});
        setProfileData(profileData.data)
        } catch (error) { ToastError(error.data.message) }
    }

    React.useEffect(()=>{
        ProfileSubmit();
    },[])

    return (
        <>
    <div>
        {/*------------------------profile*/}
        <div className="container w-11/15 mx-auto px-4  mt-4 border border-slate-300 bg-white rounded ">
            <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                <div className="flex flex-wrap -mx-3">
                    <div className="flex-none w-auto max-w-full px-3">
                        <div className="relative">
                        <img className=" w-32 h-32 rounded-full" src={!profileData?"loading...": createImageFromInitials(500, profileData.name, getRandomColor())
                        } fallback={<Breathing  />}/>
                            <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                        </div>
                    </div>
                    <div className="flex-none w-auto max-w-full px-3 my-auto">
                        <div className="h-full">
                            <h5 className="mb-1 text-2xl font-semibold">{!profileData?null:profileData.name}</h5>
                            <p className="mb-0 leading-normal text-slate-600 text-size-sm"><i className="fa-solid fa-location-dot" /> Mohali,
                                Sector 66</p>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                    </div>
                </div>
            </div>
        </div>
        <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
            <div className="grid grid-cols-3 gap-4 border-r">
                <div className="col text-sm font-medium text-slate-600">
                    <div className="grid grid-cols-3 gap-4 bg-slate-100">
                        <div>
                            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Language</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="ml-2 p-4 grid grid-cols-2 gap-4">
                        <div className>
                            {!profileData?null:
                            profileData.language.map((lang,index)=>{
                                return(
                                <ul className="list-none font-normal  text-base text-black">
                                    <li>{index+1}. {lang}</li>
                                </ul>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className=" col-span-2 text-sm font-medium text-slate-600 ">
                    <div className="grid grid-cols-1 gap-4 bg-slate-100">
                        <div>
                            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Bio</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="ml-2 p-4 grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <p className="font-normal text-base text-black">{!profileData?null:profileData.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/*------------------------------------------------------------ROW1*/}
            {/*------------------------------------------------------------ROW2*/}
            <div className=" grid grid-cols-3 gap-4 border-r">
                <div className="col text-sm font-medium text-slate-600">
                    <div className="grid grid-cols-3 gap-4 bg-slate-100">
                        <div>
                            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Skills</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="ml-2 p-4 grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                        {!profileData?null:
                            profileData.myskill.map((skill)=>{
                                return(
                            <ul className="list-none font-normal text-base text-black">
                                <li className="rounded-full text-center bg-blue-100 text-blue-800 my-2">
                                    <span>{skill.name}</span>
                                </li>
                            </ul>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 text-sm font-medium text-slate-600 ">
                    <div className="grid grid-cols-2 gap-4 bg-slate-100">
                        <div>
                            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Experience</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="ml-2 p-4 grid grid-cols-1 gap-2">
                        <div>
                        {!profileData?null:
                            profileData.experience.map((data)=>{
                                return(
                                    <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-4">
                                    <p className="text-black text-base">{data.position}</p>
                                    <p className="font-normal text-blue-800 text-base">{data.company}</p>
                                    <p className="font-normal text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> {data.startDate}
                                        - {data.endDate}</p>
                                    </div>
                                </div>
                                )
                            })}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <br />
            <br />
        </div>
        {/*------------------------------------------------------------ROW2*/}
    </div>
    </>
  )
}

export default ViewProfile
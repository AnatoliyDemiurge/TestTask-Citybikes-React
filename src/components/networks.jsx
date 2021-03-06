import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks, fetchOneNetwork} from '../services/dataAPI';
import clases from "./networks.module.scss";
import likeChoose from "../assets/icons/like-choose.png"
import likeBasic from "../assets/icons/like-basic.png"
import preloader from "../assets/icons/preloader.png"

const Networks = () => {
    const dispath = useDispatch()
    const networks = useSelector(state => state.networks.networks)
    const stations = useSelector(state => state.stations.stations)
    const likedNetworks = useSelector(state => state.networks.likedNetowrks)
    const choosenNetwork = useSelector(state => state.stations.choosenNetwork)

    const check = (networkId) => {
        let result = false 
        likedNetworks.map(likedNetwork => {
            if (networkId === likedNetwork) {
                result = true                
            }
        })
        return result
    }

    useEffect(()=>{
        fetchNetworks().then(data => dispath({type:"FETCH_NETWORKS", payload:data}))
    },[])
    
    useEffect(()=>{
        if (Object.keys(networks).length > 0 ){
            fetchOneNetwork(networks.networks[0].id).then(data => dispath({type:"CHOOSE_NETWORK", payload:data}))
        }
    },[networks.networks])

    return (
        <div>
            <div className={clases.info}>
                {
                    choosenNetwork.length 
                    ? 
                        <div>
                            Выбранная станция:{choosenNetwork}
                        </div> 
                    : 
                        <div>
                            <img   
                                className={clases.preloader}
                                src={preloader}
                                alt="preloader"
                            />
                        </div>
                }
                {
                    stations.network 
                    ?
                        <div>
                            Колличество станций в выбранной сети:{stations.network.stations.length}
                        </div>
                    :
                        <div>
                            <img   
                                className={clases.preloader}
                                src={preloader}
                                alt="preloader"
                            />
                        </div>
                }
            </div>
            <div 
                className={clases.container}
            >
            {
                Object.keys(networks).length > 0 
                ?
                    <div>
                        {networks.networks.map(network => 
                            <div 
                                className={clases.networkWrapper} 
                                key={network.id}
                            >
                                <div
                                    className={clases.networkItem}
                                    onClick={() => {
                                        fetchOneNetwork(network.id).then(data=>dispath({type:"CHOOSE_NETWORK", payload:data}))
                                    }}
                                >
                                    {network.id}
                                </div>
                                <div>
                                    {
                                        likedNetworks.length > 0 
                                        ? 
                                        <div>
                                            {
                                            check(network.id) 
                                            ? 
                                            <div
                                                className={clases.pad}
                                                onClick={
                                                    ()=>{
                                                        dispath({type:"DISLIKE_NETWORK", payload:network.id})

                                                        let arrNetworks = localStorage.likedNetworks.split(',')
                                                        let filterArrNetworks = arrNetworks.filter(likedNetwork => likedNetwork !== network.id)
                                                        
                                                        localStorage.setItem("likedNetworks", filterArrNetworks)
                                                        }
                                                    }
                                            >
                                                <img   
                                                    className={clases.like}
                                                    src={likeChoose}
                                                    alt="likeChoose icon"
                                                />
                                            </div> 
                                            : 
                                            <div 
                                                onClick={
                                                    ()=>{
                                                        dispath({type:"LIKE_NETWORK", payload:network.id})
                                                        if (localStorage.likedNetworks){
                                                            let arrNetworks = localStorage.likedNetworks.split()
                                                            arrNetworks.push(network.id)
                                                            localStorage.setItem("likedNetworks", arrNetworks)
                                                        }
                                                        else{
                                                            localStorage.setItem("likedNetworks", network.id)
                                                        }
                                                        }
                                                    }
                                            >
                                                <img   
                                                    className={clases.like}
                                                    src={likeBasic}
                                                    alt="likeBasic icon"
                                                />
                                            </div>
                                            }                                        
                                        </div>
                                        :
                                        <div
                                            onClick={
                                                ()=>{
                                                        dispath({type:"LIKE_NETWORK", payload:network.id})
                                                        if (localStorage.likedNetworks){
                                                            let arrNetworks = localStorage.likedNetworks.split()
                                                            arrNetworks.push(network.id)
                                                            localStorage.setItem("likedNetworks", arrNetworks)
                                                        }
                                                        else{
                                                            localStorage.setItem("likedNetworks", network.id)
                                                        }
                                                    }
                                                }
                                        >
                                            <img   
                                                className={clases.like}
                                                src={likeBasic}
                                                alt="likeBasic icon"
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                :
                    <div>
                        <img   
                            className={clases.preloader}
                            src={preloader}
                            alt="preloader"
                        />
                    </div>
                }
                {
                    Object.keys(stations).length > 0 
                    ?
                        <div>
                            {stations.network.stations.map(station => 
                                <div
                                    key={station.id}
                                    className={clases.stationsWrapper}
                                >
                                    {station.id}
                                </div>
                            )}
                        </div>
                    :
                        <div>
                            <img   
                                className={clases.preloader}
                                src={preloader}
                                alt="exit icon"
                            />
                        </div>
            }
            </div>
        </div>
    );
};

export default Networks;
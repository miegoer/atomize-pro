import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Rocket from '../assets/icons/rocket-icon.png';
import Sprout from '../assets/icons/sprout-icon.png';
import Book from '../assets/icons/book-icon.png';
import Meal from '../assets/icons/meal-icon.png';
import MoneyBag from '../assets/icons/moneybag-icon.png';
import Star from '../assets/icons/star-icon.png';
import Barbell from '../assets/icons/barbell-icon.png';
import Sun from '../assets/icons/sun-icon.png';
import PiggyBank from '../assets/icons/piggybank-icon.png';
import Lightning from '../assets/icons/lightning-icon.png';
import Lightbulb from '../assets/icons/lightbulb-icon.png';
import PlaneGlobe from '../assets/icons/plane-globe-icon.png';
import {createTab} from '../ApiService';
import { url } from "inspector";

interface Tab {
    name: string;
    icon: string;
    col_one?: any | null;
    col_one_b?: any | null;
    col_two?: any | null;
    col_two_b?: any | null;
    col_three?: any | null;
    col_three_b?: any | null;
    order_no: number;
  }
  

  interface CreateNewTabProps {
    tabs: Tab[];
    
  }

export default function CreateNewTab(props: CreateNewTabProps) {
    const navigate = useNavigate();
    const allIcons: { url: string; name: string }[] = [{url: Rocket, name: 'Rocket'}, {url: Sprout, name: 'Sprout'}, {url: Sun, name: 'Sun'}, {url: PlaneGlobe, name: 'PlaneGlobe'}, {url: Book, name: 'Book'}, {url: Meal, name: 'Meal'}, {url: Barbell, name: 'Barbell'}, {url: MoneyBag, name: 'MoneyBag'}, {url: PiggyBank, name: 'PiggyBank'}, {url: Star, name: 'Star'}, {url: Lightning, name: 'Lightning'}, {url: Lightbulb, name: 'Lightbulb'}];
    const [chosenIcon, setChosenIcon] = useState<string>('');
    const [tabName, setTabName] = useState<string>('');
    const [tabData, setTabData] = useState<Tab>({name: tabName, icon: chosenIcon, col_one: null, col_one_b: null, col_two: null, col_two_b: null, col_three: null, col_three_b: null, order_no: props.tabs.length + 1})

    const handleTabNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { setTabName(event.target.value) }

    const handleChooseIcon = (icon: string) => {
        console.log("icon:", icon)
        setChosenIcon(icon)
    }

    const findPath = () => {
        return tabData.name.replace(/\s+/g, '-');
    }

    useEffect(() => {
        setTabData({...tabData, icon: chosenIcon});
      }, [chosenIcon])

    useEffect(() => {
        setTabData({...tabData, name: tabName});
      }, [tabName])

    const handleCreateTab = async(tab: Tab) => {
        console.log("handleCreateTab", tab);
        if (!tabName) {
            alert('Please choose a name for your tab');
            return;
        }
        if (!chosenIcon) {
            alert('Please choose an icon');
            return;
        }
        try {
            await createTab(tab);
            console.log('New tab has been submitted succesfully');
            const path: string = findPath();
            navigate(`${path}`);
            window.location.reload();
        } catch (error) {
            console.log('Error submitting tab:', error);
        }       
    }

    return (
        <div data-testid="create-new-tab" className="new-tab-container">
            <span className="create-tab-text">Name your tab</span>
            <input type="text" id="name-tab" value={tabName} onChange={handleTabNameChange}></input>
            <span className="create-tab-text">Choose your tab icon:</span>
            <div className="icon-list">
                {allIcons.map((icon: any) => <img src={icon.url} key={icon.name} data-testid={icon.name} className={`icon-choice ${chosenIcon === icon.url ? 'icon-chosen' : 'null'}`} onClick={() => {handleChooseIcon(icon.url)}}/>)}
            </div>
            <button id="submit-new-tab" onClick={()=> {handleCreateTab(tabData)}}>Create Tab</button>
        </div>
    )
}
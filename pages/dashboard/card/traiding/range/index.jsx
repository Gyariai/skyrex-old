import { useSelector, useDispatch } from 'react-redux'
import {set_form_traiding_amount } from "../../../../../_dispatch/user"
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react'


export const Range = ({ min, max, disabled }) => {
    const dispatch = useDispatch()
    const { balanceform, account } = useSelector(state => state.userdata.user)

    const check = (account === 0 || account === 4)

    const Change = (e) => {
        if(check && disabled === false) {
            dispatch(set_form_traiding_amount(e[0]))
        }
    }

    return (
        <div className="dashboard-row-item-inner-input">
            <div className="range-block">
                <RangeSlider
                    min={min} max={max}
                    colorScheme='green'
                    value={[balanceform]}
                    onChange={(e) => Change(e)}
                >
                    <RangeSliderTrack color='tomato'>
                        <RangeSliderFilledTrack color='tomato'/>
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                </RangeSlider>
                
            </div>
        </div>              
    )
}
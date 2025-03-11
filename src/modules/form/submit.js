import dayjs from 'dayjs'
import { scheduleNew } from '../../services/schedule-new.js'
import { schedulesDay } from '../schedules/load.js'

const form = document.querySelector('form')
const clientName = document.getElementById('client')
const selectedDate = document.getElementById('date')

const inputToday = dayjs(new Date()).format('YYYY-MM-DD')

selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = clientName.value.trim()
    const hourSelected = document.querySelector('.hour-selected')
    const [ hour ] = hourSelected.innerText.split(':')
    const when = dayjs(selectedDate.value).add(hour, 'hour')
    const id = new Date().getTime()
    
    await scheduleNew({
      id,
      name,
      when
    })

    if(!name) {
      return alert('Informe um nome para o agendamento!')
    }
    
    if(!hourSelected) {
      return alert('Selecione um horário para agendamento!')
    }

    await schedulesDay()

    clientName.value = ''
  } catch(error) {
    alert('Não foi possível realizar o agendamento.')
    console.log(error)
  }
}
"use client"

import NullData from "@/components/null-data"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "@/lib/formatDate"
import { MuseumDate, MuseumHour } from "@prisma/client"
import { useState } from "react"
import CheckoutClient from "./checkout-client"

interface Props {
  days: MuseumDate[]
  hours: MuseumHour[]
}

export default function ReservationsForm({ days, hours }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)
  const [selectedPeople, setSelectedPeople] = useState<string | undefined>(undefined)
  const [isCheckout, setIsCheckout] = useState(false)

  console.log("selectedDay", days)

  // obtener las horas del dia seleccionado
  const hoursperday = hours.filter((hour) => hour.museumDateId === selectedDay)

  // obtener los espacios diponibes del selectedhour
  const spaces = hoursperday.filter((hour) => hour.id === selectedHour)

  const handleSelectChange = (value: string) => {
    setSelectedDay(value);
    setSelectedHour(undefined);
    setSelectedPeople(undefined);
  };

  const handleSelectHourChange = (value: string) => {
    setSelectedHour(value);
  }

  const handleSelectPeopleChange = (value: string) => {
    setSelectedPeople(value);
  }

  const handlesubmit = () => {
    const reservationRequest = {
      museumDateId: selectedDay,
      museumHourId: selectedHour,
      people: selectedPeople,
    }

    setIsCheckout(true)
    localStorage.setItem("reservationRequest", JSON.stringify(reservationRequest))
  }

  if (days.length === 0) return (
    <NullData title="Actualmente no hay fechas disponibles" />
  )

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="flex flex-col gap-6 md:col-span-2">
        <p>Formulario de reservaciones</p>

        <p>Eligue que dia quieres venir</p>
        <Select value={selectedDay} onValueChange={handleSelectChange} >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Dia a elegir" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fechas Disponibles</SelectLabel>
              {days.map((day) => (
                <SelectItem key={day.id} value={day.id}>{formatDate(day.date.toString())}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <p>Elige la hora que quieres venir</p>
        <Select value={selectedHour} onValueChange={handleSelectHourChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Hora a elegir" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Horas Disponibles</SelectLabel>
              {hoursperday.map((hour) => (
                <SelectItem key={hour.id} value={hour.id}>{hour.hour}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedHour && (
          <>
            <p>Elige el numero de personas que van a venir</p>
            <Select value={selectedPeople} onValueChange={handleSelectPeopleChange} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Numero de personas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Numero de personas</SelectLabel>
                  {spaces.map((space) => (
                    <>
                      {Array.from({ length: space.available }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Personas</SelectItem>
                      ))}
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}

        {selectedPeople && (
          <Button disabled={isCheckout} onClick={handlesubmit}>
            Reservar lugar(es)
          </Button>
        )}
      </div>

      {isCheckout && (
        <div className="md:col-span-3">
          <CheckoutClient
            museumDateId={selectedDay as string}
            museumHourId={selectedHour as string}
            people={selectedPeople as string}
          />
        </div>
      )}

    </div>
  )
}
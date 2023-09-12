<script setup>
import {ref} from 'vue';
import axios from "axios";

let isModalShow = ref(false);
let cardToken = ref('');
let cardData = {};
let loadData = ref({});
const generateToken = async () => {
  try {
    cardData.expiration_year = cardData.expiredDate.slice(-4);
    cardData.expiration_month = cardData.expiredDate.slice(0, 2);
    delete cardData.expiredDate;
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/register-card`,
        cardData,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          },
        }
    );

    const {data} = response;
    if (data.success) {
      cardToken.value = data.token;
      cardData = {};
      isModalShow.value = false;

    } else {
      cardToken = '';
      alert(data.message);
    }

  } catch (e) {
    let message = "Error";
    if (axios.isAxiosError(e)) {
      message = e.response?.data?.message;
    }
    alert(message);
  }
}

const validateToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-card?token=${cardToken.value}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          },
        }
    );

    const {data} = response;
    if (data.success) {
      loadData.value = data.card;
    } else {
      loadData.value = {};
      cardToken.value = '';
      alert(data.message);
    }

  } catch (e) {
    let message = "Error";
    if (axios.isAxiosError(e)) {
      message = e.response?.data?.message;
    }
    alert(message);
  }
}
console.log(isModalShow.value);
</script>

<template>
  <div
      v-if="isModalShow"
      id="validation-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-modal flex justify-center items-center"
  >
    <div class="relative w-full max-w-md max-h-full content-center">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Agrega tu tarjeta
          </h3>
          <form class="space-y-6" @submit.prevent="generateToken">
            <div>
              <label
                  for="card_number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Numero de tarjeta</label
              >
              <input
                  v-model="cardData.card_number"
                  type="text"
                  name="card_number"
                  id="card_number"
                  maxlength="16"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="123456789"
                  required
              />
            </div>
            <div>
              <label
                  for="cvv"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >CVV</label
              >
              <input
                  v-model="cardData.cvv"
                  type="text"
                  name="cvv"
                  id="cvv"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="123"
                  required
              />
            </div>
            <div>
              <label
                  for="expired_date"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Fecha de expiración</label
              >
              <input
                  placeholder="MM/YYYY"
                  v-model="cardData.expiredDate"
                  name="expired_date"
                  id="expired_date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
              />
            </div>
            <div>
              <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
              >
              <input
                  v-model="cardData.email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
              />
            </div>
            <div v-if="!!cardToken">
              <label
                  for="token_generated"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><b>Token generado</b></label
              >
              <input
                  v-model="cardToken"
                  type="text"
                  name="token_generated"
                  id="token_generated"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                  readonly
              />
            </div>
            <div style="margin-top: 10px">
              <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Agregar
              </button>
              <button
                  @click="isModalShow = !isModalShow"
                  style="margin-left: 5px"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <button type="button" v-if="cardToken.length === 0" @click="isModalShow = !isModalShow">Agregar tarjeta</button>
    <div v-else class="card">
      <h3>
        {{ cardToken }}
      </h3>
      <button type="button" @click="validateToken()">Validar token</button>
    </div>
    <div v-if="cardToken.length > 0 && !!loadData" class="card">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Datos de tarjeta:</h2>
      <ul class="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
        <li>
          <b>Numero de tarjeta:</b> {{ loadData.card_number }}
        </li>
        <li>
          <b>CVV:</b> {{loadData.cvv}}
        </li>
        <li>
          <b>Fecha de expiración:</b> {{ loadData.expiration_month }}/{{ loadData.expiration_year }}
        </li>
        <li>
          <b>Email:</b> {{ loadData.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

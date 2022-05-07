<template>
  <section>
    <button @click="getData">Get Qrcodes</button>
    <textarea v-model="importer"></textarea>
  </section>
</template>


<script>
export default {
  data() {
    return {
      importer: null,
      links: null,
    };
  },
  methods: {
    async getData() {
      //   https://qrcode-generator-api.herokuapp.com/

      let data = this.importer.split("\n");

      data.forEach(async (element) => {
        console.log(element);

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "innerData": "12356",
  "light": "#fff",
  "dark": "#000",
  "width": "250"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:4001/qr", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
      });
    },
  },
};
</script>


<style scoped>
section {
  height: 100vh;

  width: 350px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
}

section textarea {
  border: none;
  outline: none;
  resize: none;
  border: 1px solid black;
  border-radius: 4px;
  width: 95%;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
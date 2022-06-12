<template>
    <div class="container">
        <div class="row mt-12">
            <div class="col-md-6 offset-3 card shadow card-primary p-3 border"
                 :class="{'border-primary' : isUser, 'border-success' : !isUser }">
                <h3
                        :class="{'text-primary' : isUser, 'text-success' : !isUser }"
                        class="text-center mb-3 mt-3">{{ isUser ? 'Login' : 'Sign up'}}</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input v-model="user.email" type="email" class="form-control"
                               placeholder="E-mail">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Password">
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" :class="{'btn-primary' : isUser, 'btn-success' : !isUser }"
                                class="btn btn-block mb-2">
                            {{ isUser ? 'Login' : 'Sign up' }}
                        </button>
                        <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
                            {{ isUser ? 'Create account' : 'I have an account'}}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null
                },
                isUser: true
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("login", { email: this.user.email, password: this.user.password, isUser : this.isUser })
                    .then(response => {
                      this.$router.push("/")
                    })
            }
        }
    }
</script>

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod' // integra o zod com o fastify
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event-routes'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true, // URL do frontend
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Event Manager',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform, // transforma o codigo em documentação automatica para o swagger (Json)
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running')
})

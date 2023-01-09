import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'
import path from 'path'

const container: ContainerBuilder = new ContainerBuilder()

export const registerDependencies = async (): Promise<void> => {
  const loader = new YamlFileLoader(container)

  await loader.load(path.join(__dirname, 'dependencies.yaml'))
}

export default container

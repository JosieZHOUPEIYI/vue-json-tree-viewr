pipeline {
  agent any
  stages {
    stage('Build') {
        steps {
            echo 'Building....'
            echo "execute install#################"
            tnpm install || exit 1
            echo "execute install done#################"
        }
    }

    stage('Test') {
      steps {
        echo 'Testing.....'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }

  }
}
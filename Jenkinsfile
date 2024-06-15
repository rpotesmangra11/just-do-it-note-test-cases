pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run note-tests'
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/results',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
            }
        }
        stage('Upload Report') {
            steps {
                git credentialsId: '995a8fdc-ed31-4a1c-949b-1b3f32a0b760', url: 'https://github.com/rpotesmangra11/just-do-it-note-test-cases.git'
                sh 'git config user.email "potesmangrar11@gmail.com"'
                sh 'git config user.name "rpotesmangra11"'
                sh 'git add cypress/results/mochawesome.html'
                sh 'git commit -m "Add test report"'
                sh 'git push'
            }
        }
    }
    post {
        success {
            echo 'Build was successful!'
        }
    }
}
pipeline {
    agent { label 'windows' }

    stages {
        stage('Install') {
            steps {
                echo 'Starting the Install stage...'
                bat 'npm install'
                echo 'Finished the Install stage.'
            }
        }

        stage('Test') {
            steps {
                echo 'Starting the Test stage...'
                bat 'npm run note-tests'
                echo 'Finished the Test stage.'
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Starting the Publish Reports stage...'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/results',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
                echo 'Finished the Publish Reports stage.'
            }
        }
        stage('Upload Report') {
            steps {
                echo 'Starting the Upload Report stage...'
                git credentialsId: '995a8fdc-ed31-4a1c-949b-1b3f32a0b760', url: 'https://github.com/rpotesmangra11/just-do-it-note-test-cases.git'
                bat 'git config user.email "potesmangrar11@gmail.com"'
                bat 'git config user.name "rpotesmangra11"'
                bat 'git add cypress/results/mochawesome.html'
                bat 'git commit -m "Add test report"'
                bat 'git push'
                echo 'Finished the Upload Report stage.'
            }
        }
    }
    post {
        success {
            echo 'Build was successful!'
        }
    }
}
from qiskit_ibmq_provider import IBMQ

# Save your IBM Quantum Experience API token
IBMQ.save_account('999098f5ebd4484778f97b716af56b5c3f2019b432698417644a20c76050c3a79a275c07592e3ab9c7c4dd5c0037885013c4e7e9cb27028e368eff2009b30197')  # Do this once

IBMQ.load_account()


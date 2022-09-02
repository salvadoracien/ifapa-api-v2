## OPC-PLC Register
## Versión 1.0
## Registro de datos de PLC (arquitectura SoMachine) procedentes
## de servidor OPC.
## José González (jogohe.94@gmail.com)
## Enrique Rodríguez Miranda (enrique.romir@gmail.com)
##
import socket
import csv
import time
import os.path
import pywintypes
import OpenOPC
import win32timezone, datetime
import win32com.client
import sys

pywintypes.datetime = pywintypes.TimeType
from datetime import datetime


def FileName():
    now=datetime.now()
    FileName='Registro_Reactores'+'_'+str('%02d' %now.day)+'_'+str('%02d' %now.month)+'_'+str(now.year)[-2:]+'.csv'
    return FileName

def OPC_ini(tags):
    opc = OpenOPC.client()
    opc.connect('CoDeSys.OPC.DA','localhost')  
    print('Conectado al servidor OPC con éxito.')

    # Creacion de directorios
    dir_opc = opc.list()
    cwd_folder = os.getcwd() # Carpeta del script
    for name in dir_opc:
        path = 'C:\\Users\\CALRESI\\Desktop\\SCADA CALRESI\\Registro_datos_python'
        try:
            os.mkdir(path)
            print ("Successfully created the directory %s " % path)
        except:
            continue
        #except OSError:
        #    print ("Creation of the directory %s failed" % path)
        #else:
    while opc.read('PLC_CALRESI.Application.GVL._pHRW5_1')[0] == 0: #Comprobamos que el OPC está recibiendo valores de lectura correctos antes de general el grupo (29/08/2022)
        print ("- Esperando valores correctos de lectura para establecer grupo de variables.. ")
    else:
        opc.read(tags, group = 'mygroup', update=1) #Generamos grupo con las tags del PLC (09/05/2022)
        print ("- Valores correctos detectados. Grupo de variables establecido. ")
    return opc, dir_opc, path

def OPC_conection():
    data_values = []
    while opc.read('PLC_CALRESI.Application.GVL._pHRW5_1')[0] == 0: #Comprobamos que el OPC está recibiendo valores de lectura correctos antes de leer (29/08/2022) 
        print('- Fallo en la comunicación OPC. Esperando recoenexión...')    
    else:
        data_values = opc.read(group='mygroup') # LLamamos unicamente al grupos generados en OPC_ini() (09/05/2022)
    return data_values

def csv_register(info, Buffer, tags, data, path):
    csvf = FileName() # Nombe del archivo
    cwd_folder = os.getcwd() # Carpeta del script
    directory = path+'\\'+csvf
    
    try:
        #Si se ha abierto el archivo durante la ejecucion
        if len(Buffer)>=1:
             with open(directory, 'a', newline='') as outcsv:
                csv_writer = csv.writer(outcsv, delimiter=';')
                for row in Buffer:
                    csv_writer.writerow(row)
             outcsv.close()
             Buffer=[]
             print(result2 + ' - El Excel ha sido cerrado y actualizado satisfactoriamente.')
             
        #Si el archivo existe
        if os.path.isfile(directory):
            if info == False:
                print( result2 + ' - Registrando datos en: ' + csvf + '...')
                info = True
            # time data input
            with open(directory, 'a', newline='') as outcsv:
                csv_writer = csv.writer(outcsv, delimiter=';')
                csv_writer.writerow(data)
            outcsv.close()
        #Si el archivo no existe    
        else:
            #Etiquetas de la cabecera
            headercsv = ['Fecha','Hora','Control RW5','pH RW5 1','pH RW5 2a','pH RW5 2b','OD RW5 1','OD RW5 2a','OD RW5 2b','CE RW5','Caudal Aire RW5','Caudal CO2 RW5','Nivel RW5','Subir nivel RW5','Bajar nivel RW5','Litros cosechados RW5','Temp RW5','Temp Suelo RW5',
                         'Control RW6','pH RW6 1','pH RW6 2a','pH RW6 2b','OD RW6 1','OD RW6 2a','OD RW6 2b','CE RW6','Caudal Aire RW6', 'Caudal CO2 RW6','Nivel RW6','Subir nivel RW6','Bajar nivel RW6','Litros cosechados RW6','Temp RW6','Temp Suelo RW6','Nivel tanque',
                         'Temp Ambiente','Hum Relativa','Rad Global','Rad PAR','Vel Viento','Dir Viento','Aux 1', 'Aux 2', 'Aux 3', 'Aux 4', 'Aux 5', 'Aux 6', 'Aux 7', 'Aux 8', 'Aux 9', 'Aux 10'
                         ]
            
            print(result2 + ' - Registrando datos en: ' + csvf + '...')
            info = True
            with open(directory, 'w', newline='') as headcsv:
                csv_writer_head = csv.writer(headcsv, delimiter=';')
                csv_writer_head.writerow(headercsv)
                csv_writer = csv.writer(headcsv, delimiter=';')
                csv_writer.writerow(data) 
            headcsv.close()
    except:
        if len(Buffer)<1:
            print(result2 + ' - El Excel se encuentra abierto. Cierrelo lo antes posible.')
        Buffer.append(data)     
    return info, Buffer
        
## MAIN
Tm = 1 #Tiempo de muestreo
cnt = True
info = False
comm_fail = False
start_fail = []
duration_fail = []
global Buffer
Buffer=[]
previous_second = 0;

#Declaramos las tags del PLC (09/05/2022)
tags = ['PLC_CALRESI.Application.GVL._NombreControl_RW5','PLC_CALRESI.Application.GVL._pHRW5_1','PLC_CALRESI.Application.GVL._pHRW5_2a','PLC_CALRESI.Application.GVL._pHRW5_2b',
        'PLC_CALRESI.Application.GVL._ODRW5_1','PLC_CALRESI.Application.GVL._ODRW5_2a','PLC_CALRESI.Application.GVL._ODRW5_2b','PLC_CALRESI.Application.GVL._CERW5',
	'PLC_CALRESI.Application.GVL._CaudalAireRW5','PLC_CALRESI.Application.GVL._CaudalCO2RW5','PLC_CALRESI.Application.GVL._NivelRW5','PLC_CALRESI.Application.GVL._Subir_nivel_RW5',
        'PLC_CALRESI.Application.GVL._Bajar_nivel_RW5','PLC_CALRESI.Application.GVL._Litros_Cosechados_RW5','PLC_CALRESI.Application.GVL._TempRW5','PLC_CALRESI.Application.GVL._TempSueloRW5',
        'PLC_CALRESI.Application.GVL._NombreControl_RW6','PLC_CALRESI.Application.GVL._pHRW6_1','PLC_CALRESI.Application.GVL._pHRW6_2a','PLC_CALRESI.Application.GVL._pHRW6_2b',
	'PLC_CALRESI.Application.GVL._ODRW6_1','PLC_CALRESI.Application.GVL._ODRW6_2a','PLC_CALRESI.Application.GVL._ODRW6_2b','PLC_CALRESI.Application.GVL._CERW6',
	'PLC_CALRESI.Application.GVL._CaudalAireRW6','PLC_CALRESI.Application.GVL._CaudalCO2RW6','PLC_CALRESI.Application.GVL._NivelRW6','PLC_CALRESI.Application.GVL._Subir_nivel_RW6',
        'PLC_CALRESI.Application.GVL._Bajar_nivel_RW6','PLC_CALRESI.Application.GVL._Litros_Cosechados_RW6','PLC_CALRESI.Application.GVL._TempRW6','PLC_CALRESI.Application.GVL._TempSueloRW6','PLC_CALRESI.Application.GVL._Nivel_tanque',
	'PLC_CALRESI.Application.GVL._Temp_atm','PLC_CALRESI.Application.GVL._Hum_rel_atm','PLC_CALRESI.Application.GVL._Rad_atm','PLC_CALRESI.Application.GVL._Rad_PAR_atm',
	'PLC_CALRESI.Application.GVL._Vel_viento_atm','PLC_CALRESI.Application.GVL._Dir_viento_atm','PLC_CALRESI.Application.GVL._Aux1','PLC_CALRESI.Application.GVL._Aux2','PLC_CALRESI.Application.GVL._Aux3','PLC_CALRESI.Application.GVL._Aux4',
        'PLC_CALRESI.Application.GVL._Aux5','PLC_CALRESI.Application.GVL._Aux6','PLC_CALRESI.Application.GVL._Aux7','PLC_CALRESI.Application.GVL._Aux8','PLC_CALRESI.Application.GVL._Aux9','PLC_CALRESI.Application.GVL._Aux10'      
        ]

opc, dir_opc, path = OPC_ini(tags)

while True:
    localtime = time.localtime()
    localday = datetime.now()
    result1 = str('%02d' %localday.day)+'/'+str('%02d' %localday.month)+'/'+str(localday.year)
    result2 = time.strftime('%H:%M:%S', localtime)

    if localday.second%Tm == 0 and cnt == True:
            try:
                Data_array = OPC_conection()
                if comm_fail == True:
                    print(result2 + ' - Comunicación OPC reanudada.')
                    comm_fail = False
            except Exception as ex:
                template = "An exception of type {0} occurred. Arguments:\n{1!r}"
                message = template.format(type(ex).__name__, ex.args)
                print (message)
                if comm_fail == False:
                    print(result2 + ' - Fallo en la comunicación OPC. Esperando coenexión...')
                    time.sleep(5.5) #Esperando la reconexión 5 segundos (27/04/2022)
                    comm_fail = True
                    
            total_data = []
            total_data.append(result1)
            total_data.append(result2)
            
            for Data in Data_array:
                if type(Data[1]) == bool:
                    if Data[1] == True:
                        Data = (Data[0] ,1 ,Data[2] ,Data [3])
                    else:
                        Data = (Data[0] ,0 ,Data[2] ,Data [3])
                total_data.append(Data[1])
                
            info, Buffer =  csv_register(info, Buffer, tags, total_data, path)
            previous_second = localday.second;
            cnt = False


    elif  localday.second != previous_second:
        cnt = True